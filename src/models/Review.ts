import mongoose, { Schema, models } from "mongoose";

const ReviewSchema = new Schema({
  pendingId: { type: mongoose.Schema.Types.ObjectId, ref: "PendingReview", unique: true },
  title: String,
  body: String,
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

export default models.Review || mongoose.model("Review", ReviewSchema);
