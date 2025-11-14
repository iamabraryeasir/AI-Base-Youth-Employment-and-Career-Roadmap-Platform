import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/get-session-server";
import { connectDB } from "@/lib/others/db";
import { Chat } from "@/database/chat.model";
import { Profile } from "@/database/profile.model";
import { aiClient } from "@/lib/ai/open-ai-groq";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { message } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // Save user message
    await Chat.create({
      userId,
      role: "user",
      message: message.trim(),
    });

    // Fetch user profile for context
    const profile = await Profile.findOne({ userId });

    // Construct system prompt with user context
    const systemPrompt = `
    You are CareerBot, a friendly and practical Gen Z-style career advisor.

    User skills: ${
      profile?.extractedSkills?.length
        ? profile.extractedSkills.join(", ")
        : "Not specified"
    }

    IMPORTANT INSTRUCTIONS:
    - If the user greets you (e.g., "hi", "hello", "hey"), reply with a short friendly greeting and ask what career help they need.
    - When giving advice, use ONLY the skills provided above. Never guess or invent skills.
    - Provide a clear, complete answer in 3–4 full sentences. Do not cut off or trail sentences.
    - Your tone must be supportive, simple, and natural — not robotic.
    - Give advice that is actionable and relevant to the user's skills or goals.
    - Always end every advice response with: "This is a suggestion, not a guarantee."
    - Respond in plain text only.
    `;

    // Call LLM
    let completion;
    try {
      completion = await aiClient.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
        model: "openai/gpt-oss-20b",
        max_tokens: 300,
        temperature: 0.7,
        top_p: 1,
        stream: false,
      });
    } catch (llmError) {
      throw llmError;
    }

    // Validate LLM response
    if (
      !completion.choices ||
      !completion.choices[0] ||
      !completion.choices[0].message
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to generate a valid response. Please try again.",
        },
        { status: 500 }
      );
    }

    const reply = completion.choices[0].message.content || "";

    // Validate reply is not empty - be more lenient
    if (!reply || (typeof reply === "string" && reply.trim().length === 0)) {
      return NextResponse.json(
        {
          success: false,
          error: "The AI model returned an empty response. Please try again.",
        },
        { status: 500 }
      );
    }

    // Save assistant message
    await Chat.create({
      userId,
      role: "assistant",
      message: reply.trim(),
    });

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate response";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
