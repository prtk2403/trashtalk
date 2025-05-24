// app/api/generate/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { supabase } from "@/lib/supabaseClient"; // Ensure this path is correct

// System prompt for Gemini (keep as is)
const SYSTEM_PROMPT = `You are an extremely online, ironic shitposter who thrives on absurdity, memes, pop culture, and chaos. Your job is to generate short, punchy, hilarious tweets that are intentionally weird, sarcastic, edgy (but not offensive), and extremely relatable or unrelatable in a funny way.

Tone:
- Ironic, Gen Z humor
- Self-deprecating or hyper-confident
- Often uses meme formats or unexpected punchlines

Formatting Rules:
- Limit to 280 characters
- Can include line breaks for comedic timing
- No hashtags, no emojis unless used ironically
- Use lowercase for casual tone, ALL CAPS for dramatic effect

Style Examples:
- "me: i should sleep
also me at 3am: who would win in a fight, a billion lions or the sun?"
- "every day i wake up and choose violence. then i snooze my alarm and go back to sleep."
- "job interview question: 'how do you handle stress?'
me: poorly"

Avoid:
- Anything hateful, political, NSFW, or triggering
- Slurs, targeted jokes, or real people/events unless universally understood memes

Output Format:
- One tweet per output
- No explanations
- Keep it weird, keep it stupid, keep it funny
- Use relevant hashtags wherever required
`;

// Tone descriptions for Gemini (keep as is)
const TONE_DESCRIPTIONS = {
  "gen-z":
    "Generate a tweet with Gen Z Burnout humor. Use lowercase, internet slang, and existential dread mixed with humor.",
  "tech-bro":
    "Generate a tweet in Tech Bro Manifesto style. Reference hustle culture, startups, crypto, or productivity hacks in an ironic way.",
  "corporate":
    "Generate a tweet with Corporate Cringe humor. Use corporate buzzwords and jargon in an absurd, satirical way.",
  "absurdist": "Generate a tweet with Absurdist Nihilism humor. Make it weird, random, and philosophical in a funny way.",
  "anime": "Generate a tweet as an Anime Lord. Reference anime tropes and culture in an over-the-top, self-aware way.",
};

const RATE_LIMIT_COUNT = 10; // Max 10 posts
const RATE_LIMIT_WINDOW_HOURS = 24; // per 24 hours

export async function POST(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const { tone } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 });
    }

    // --- Rate Limiting ---
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000).toISOString();
    
    const { data: recentPosts, error: countError } = await supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", windowStart);

    if (countError) {
      console.error("Error counting posts for rate limiting:", countError);
      return NextResponse.json({ error: "Failed to check usage limits." }, { status: 500 });
    }

    if (recentPosts && recentPosts.length >= RATE_LIMIT_COUNT) { // Supabase count is returned in a separate count property when {count: 'exact'}
      const { count } = await supabase
        .from("posts")
        .select("id", { count: "exact" }) // Re-query to get actual count
        .eq("user_id", user.id)
        .gte("created_at", windowStart);
        
      if (count && count >= RATE_LIMIT_COUNT) {
        return NextResponse.json(
          { error: `Rate limit exceeded. Max ${RATE_LIMIT_COUNT} posts per ${RATE_LIMIT_WINDOW_HOURS} hours.` },
          { status: 429 }
        );
      }
    }
    // A more robust way to get the count directly if using `head: true` might not return the count in the way expected for length check
    // Let's get the count explicitly
    const { count: postsCount, error: explicitCountError } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', windowStart);

    if (explicitCountError) {
        console.error('Error counting posts for rate limiting:', explicitCountError);
        return NextResponse.json({ error: 'Failed to check usage limits due to count error.' }, { status: 500 });
    }
    
    if (postsCount !== null && postsCount >= RATE_LIMIT_COUNT) {
        return NextResponse.json(
            { error: `Rate limit exceeded. You have made ${postsCount} posts. Max ${RATE_LIMIT_COUNT} posts per ${RATE_LIMIT_WINDOW_HOURS} hours.` },
            { status: 429 }
        );
    }


    // --- Generate Content ---
    const toneDescription = TONE_DESCRIPTIONS[tone as keyof typeof TONE_DESCRIPTIONS] || TONE_DESCRIPTIONS["gen-z"];
    const userPrompt = `${toneDescription}`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, // Updated model
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user", // Gemini prefers 'user' and 'model' roles
              parts: [{ text: SYSTEM_PROMPT }, { text: userPrompt }],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 40, // TopK can be 1 for gemini-1.5-flash, check docs for 2.0
            topP: 0.95,
            maxOutputTokens: 300, // Increased slightly based on Gemini 1.5 Flash typical usage
          },
          // Optional: safetySettings if needed
          // safetySettings: [
          //   { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          //   { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          //   { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          //   { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          // ]
        }),
      }
    );

    const geminiData = await geminiResponse.json();

    if (!geminiResponse.ok || !geminiData.candidates || geminiData.candidates.length === 0) {
      console.error("Gemini API error:", geminiData);
      const errorDetail = geminiData.error?.message || "Failed to generate content from AI model";
      return NextResponse.json({ error: errorDetail }, { status: geminiResponse.status || 500 });
    }

    const generatedText = geminiData.candidates[0].content.parts[0].text.trim();

    // --- Store Post in Supabase ---
    const { error: insertError } = await supabase
      .from("posts")
      .insert([{ user_id: user.id, content: generatedText, tone: tone }]);

    if (insertError) {
      console.error("Error saving post to Supabase:", insertError);
      // Don't fail the whole request if saving fails, but log it.
      // Optionally, you could return an error here if saving is critical.
    }

    return NextResponse.json({ shitpost: generatedText });

  } catch (error) {
    console.error("Error in /api/generate:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}