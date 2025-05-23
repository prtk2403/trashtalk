import { type NextRequest, NextResponse } from "next/server"

// System prompt for Gemini
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
`

// Tone descriptions for Gemini
const TONE_DESCRIPTIONS = {
  "gen-z":
    "Generate a tweet with Gen Z Burnout humor. Use lowercase, internet slang, and existential dread mixed with humor.",
  "tech-bro":
    "Generate a tweet in Tech Bro Manifesto style. Reference hustle culture, startups, crypto, or productivity hacks in an ironic way.",
  "corporate":
    "Generate a tweet with Corporate Cringe humor. Use corporate buzzwords and jargon in an absurd, satirical way.",
  "absurdist": "Generate a tweet with Absurdist Nihilism humor. Make it weird, random, and philosophical in a funny way.",
  "anime": "Generate a tweet as an Anime Lord. Reference anime tropes and culture in an over-the-top, self-aware way.",
}

export async function POST(request: NextRequest) {
  try {
    const { tone } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 })
    }

    const toneDescription = TONE_DESCRIPTIONS[tone as keyof typeof TONE_DESCRIPTIONS] || TONE_DESCRIPTIONS["gen-z"]

    // Construct the prompt for Gemini
    const userPrompt = `${toneDescription}`

    // Call Gemini API
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: SYSTEM_PROMPT }, { text: userPrompt }],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 300,
          },
        }),
      },
    )

    const data = await response.json()

    // Handle potential errors in the Gemini response
    if (!data.candidates || data.candidates.length === 0) {
      console.error("Gemini API error:", data)
      return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
    }

    // Extract the generated text
    const generatedText = data.candidates[0].content.parts[0].text

    return NextResponse.json({ shitpost: generatedText.trim() })
  } catch (error) {
    console.error("Error generating shitpost:", error)
    return NextResponse.json({ error: "Failed to generate shitpost" }, { status: 500 })
  }
}
