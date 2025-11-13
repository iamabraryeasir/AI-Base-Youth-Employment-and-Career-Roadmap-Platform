import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { connectDB } from "@/lib/others/db";

export async function withApiProtection(
  request: Request,
  callback: () => Promise<Response>
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }

    await connectDB();

    return await callback();
  } catch (error) {
    console.error("❌ API Error:", error);

    return NextResponse.json(
      { success: false, message: (error as Error).message ?? "Server error" },
      { status: 500 }
    );
  }
}
