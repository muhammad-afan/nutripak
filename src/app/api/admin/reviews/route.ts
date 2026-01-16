import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { requireAdmin } from "@/lib/auth";
import PendingReview from "@/models/PendingReview";
import Review from "@/models/Review";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const country =
   request.headers.get("x-vercel-ip-country") ?? "UNKNOWN";
    console.log("🚀 ~ GET ~ country:", country)

    console.log("these are complete headers", request.headers);
    await dbConnect();



    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");
    const item = searchParams.get("item");
    const status = searchParams.get("status");

    let query: any = {};

    if (phone) {
      query.phone = { $regex: phone, $options: "i" };
    }

    if (item) {
      query.item = item;
    }

    let pendingReviews = await PendingReview.find(query).sort({ createdAt: -1 }).lean();

    // Filter by status if provided
    if (status === "reviewed") {
      pendingReviews = pendingReviews.filter((pr) => pr.reviewId);
    } else if (status === "pending") {
      pendingReviews = pendingReviews.filter((pr) => !pr.reviewId);
    }

    // Get review details for reviewed ones
    const reviewIds = pendingReviews.filter((pr) => pr.reviewId).map((pr) => pr.reviewId);
    const reviews = await Review.find({ _id: { $in: reviewIds } }).lean();
    const reviewMap = new Map(reviews.map((r: any) => [r._id.toString(), r]));

    const result = pendingReviews.map((pr: any) => ({
      ...pr,
      review: pr.reviewId ? reviewMap.get(pr.reviewId.toString()) : null,
    }));

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Get reviews error:", error);
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    await dbConnect();

    const { phone, name, address, item, quantity } = await request.json();

    if (!phone || !item || !quantity) {
      return NextResponse.json(
        { error: "Phone, item, and quantity are required" },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      return NextResponse.json({ error: "Quantity must be greater than 0" }, { status: 400 });
    }

    const pendingReview = await PendingReview.create({
      phone,
      name: name || undefined,
      address: address || undefined,
      item,
      quantity,
    });

    return NextResponse.json({
      success: true,
      data: pendingReview,
      reviewLink: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/review/${pendingReview._id}`,
    });
  } catch (error: any) {
    console.error("Create review error:", error);
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
