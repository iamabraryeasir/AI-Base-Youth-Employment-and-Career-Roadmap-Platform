import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import { getServerSession } from "@/lib/auth/get-session-server";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const client = StreamChat.getInstance(
      process.env.STREAM_API_KEY!,
      process.env.STREAM_API_SECRET!
    );

    const token = client.createToken(session.user.id);

    return NextResponse.json({
      success: true,
      token,
      userId: session.user.id,
      apiKey: process.env.STREAM_API_KEY,
    });
  } catch (err) {
    console.error("Stream token error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
