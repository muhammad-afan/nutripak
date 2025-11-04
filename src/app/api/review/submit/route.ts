import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PendingReview from "@/models/PendingReview";
import Review from "@/models/Review";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { pendingId, title, body, rating } = await request.json();

    if (!pendingId || !rating) {
      return NextResponse.json(
        { error: "Pending ID and rating are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    // Check if pending review exists
    const pendingReview = await PendingReview.findById(pendingId);

    if (!pendingReview) {
      return NextResponse.json({ error: "Invalid or expired link" }, { status: 404 });
    }

    // Check if already reviewed
    if (pendingReview.reviewId) {
      return NextResponse.json({ error: "This review has already been submitted" }, { status: 400 });
    }

    // Create the review
    const review = await Review.create({
      pendingId,
      title: title || undefined,
      body: body || undefined,
      rating,
    });

    // Update pending review with the review ID
    pendingReview.reviewId = review._id;
    await pendingReview.save();

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully",
      data: review,
    });
  } catch (error: any) {
    console.error("Submit review error:", error);
    
    // Handle duplicate review (just in case)
    if (error.code === 11000) {
      return NextResponse.json({ error: "This review has already been submitted" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
