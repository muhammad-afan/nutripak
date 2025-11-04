import mongoose, { Schema, models } from "mongoose";

const PendingReviewSchema = new Schema({
  phone: { type: String, required: true },
  name: String,
  address: String,
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  reviewId: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
  linkSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default models.PendingReview || mongoose.model("PendingReview", PendingReviewSchema);
