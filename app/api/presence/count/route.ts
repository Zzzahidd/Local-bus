import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ActiveSession } from "@/models/active-session";

export const revalidate = 0; // Disable static caching for live count

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ online: null, error: "Database unavailable" }, { status: 200 });
    }

    const SixtySecondsAgo = new Date(Date.now() - 60 * 1000);
    const count = await ActiveSession.countDocuments({
      lastSeen: { $gte: SixtySecondsAgo },
    });

    return NextResponse.json({ online: count }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/presence/count:", error);
    return NextResponse.json({ online: null, error: "Count query failed" }, { status: 200 });
  }
}
