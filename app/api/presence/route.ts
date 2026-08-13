import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import { ActiveSession } from "@/models/active-session";

export async function POST() {
  try {
    const cookieStore = await cookies();
    let sessionId = cookieStore.get("local_bus_session")?.value;

    if (!sessionId) {
      sessionId = crypto.randomUUID();
    }

    const conn = await connectToDatabase();
    if (conn) {
      await ActiveSession.findOneAndUpdate(
        { sessionId },
        { lastSeen: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    const response = NextResponse.json({ success: true, sessionId });

    // Set cookie if not already set or update expiration
    response.cookies.set("local_bus_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in POST /api/presence:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
