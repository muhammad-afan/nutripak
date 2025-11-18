import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { requireAdmin } from "@/lib/auth";
import PendingReview from "@/models/PendingReview";
import Review from "@/models/Review";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    await dbConnect();

    const { id } = await params;

    const pendingReview = await PendingReview.findById(id).lean();

    if (!pendingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Get review details if it has been reviewed
    let reviewDetails = null;
    if (pendingReview.reviewId) {
      reviewDetails = await Review.findById(pendingReview.reviewId).lean();
    }

    return NextResponse.json({
      success: true,
      data: {
        ...pendingReview,
        review: reviewDetails,
      },
    });
  } catch (error) {
    console.error("Get review error:", error);
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
