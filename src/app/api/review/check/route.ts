import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PendingReview from "@/models/PendingReview";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const pendingId = searchParams.get("pendingId");

    if (!pendingId) {
      return NextResponse.json({ error: "Pending ID is required" }, { status: 400 });
    }

    const pendingReview: any = await PendingReview.findById(pendingId).lean();

    if (!pendingReview) {
      return NextResponse.json({ error: "Invalid or expired link" }, { status: 404 });
    }

    const alreadyReviewed = !!pendingReview.reviewId;

    return NextResponse.json({
      success: true,
      data: {
        ...pendingReview,
        alreadyReviewed,
      },
    });
  } catch (error) {
    console.error("Check review error:", error);
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 404 });
  }
}
