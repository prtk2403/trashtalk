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
- Keep it weird, keep it stupid, keep it funny`

// Tone descriptions for Gemini
const TONE_DESCRIPTIONS = {
  "gen-z":
    "Generate a tweet with Gen Z Burnout humor. Use lowercase, internet slang, and existential dread mixed with humor.",
  "tech-bro":
    "Generate a tweet in Tech Bro Manifesto style. Reference hustle culture, startups, crypto, or productivity hacks in an ironic way.",
  corporate:
    "Generate a tweet with Corporate Cringe humor. Use corporate buzzwords and jargon in an absurd, satirical way.",
  absurdist: "Generate a tweet with Absurdist Nihilism humor. Make it weird, random, and philosophical in a funny way.",
  anime: "Generate a tweet as an Anime Lord. Reference anime tropes and culture in an over-the-top, self-aware way.",
}

// Fallback shitposts in case API fails
const FALLBACK_SHITPOSTS = [
  "me: i should sleep\nalso me at 3am: researching if penguins have knees",
  "job interview: 'where do you see yourself in 5 years?'\nme: 'sir this is a wendy's'",
  "normalize saying 'that's above my pay grade' when someone asks what 2+2 equals",
  "my toxic trait is thinking I can finish a project in one day that actually takes six months",
  "dating app idea: you match based on what browser extensions you have installed",
  "just saw someone call a PDF a 'peef' and I think I need to log off for the day",
  "every day i wake up and choose violence. then i snooze my alarm and go back to sleep.",
  "me: i'm gonna be productive today\nalso me: learns how tall peppa pig is (7'1 btw)",
]

export async function POST(request: NextRequest) {
  try {
    // Parse request body with error handling
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError)
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    const { tone = "gen-z", customPrompt } = body

    // Validate tone
    if (!TONE_DESCRIPTIONS[tone as keyof typeof TONE_DESCRIPTIONS]) {
      return NextResponse.json({ error: "Invalid tone specified" }, { status: 400 })
    }

    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY not found, using fallback")
      // Return a random fallback shitpost
      const randomPost = FALLBACK_SHITPOSTS[Math.floor(Math.random() * FALLBACK_SHITPOSTS.length)]
      return NextResponse.json({ shitpost: randomPost })
    }

    const toneDescription = TONE_DESCRIPTIONS[tone as keyof typeof TONE_DESCRIPTIONS]

    // Construct the prompt for Gemini with optional custom prompt
    let userPrompt = toneDescription
    if (customPrompt && customPrompt.trim()) {
      userPrompt += ` Focus the tweet on: ${customPrompt.trim()}`
    }

    // Call Gemini API with timeout and error handling
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
          signal: controller.signal,
        },
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        console.error("Gemini API error:", response.status, response.statusText)
        throw new Error(`Gemini API returned ${response.status}`)
      }

      const data = await response.json()

      // Handle potential errors in the Gemini response
      if (!data.candidates || data.candidates.length === 0) {
        console.error("Gemini API returned no candidates:", data)
        throw new Error("No content generated")
      }

      // Extract the generated text
      const generatedText = data.candidates[0]?.content?.parts?.[0]?.text

      if (!generatedText) {
        console.error("No text in Gemini response:", data)
        throw new Error("No text generated")
      }

      return NextResponse.json({ shitpost: generatedText.trim() })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error("Gemini API fetch error:", fetchError)

      // Return fallback on API failure
      const randomPost = FALLBACK_SHITPOSTS[Math.floor(Math.random() * FALLBACK_SHITPOSTS.length)]
      return NextResponse.json({
        shitpost: randomPost,
        fallback: true,
        message: "Using fallback due to API issues",
      })
    }
  } catch (error) {
    console.error("Error in generate route:", error)

    // Return fallback on any error
    const randomPost = FALLBACK_SHITPOSTS[Math.floor(Math.random() * FALLBACK_SHITPOSTS.length)]
    return NextResponse.json({
      shitpost: randomPost,
      fallback: true,
      message: "Using fallback due to server error",
    })
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
