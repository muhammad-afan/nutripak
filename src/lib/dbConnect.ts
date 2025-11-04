import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not set in .env");
  const db = await mongoose.connect(process.env.MONGODB_URI);
  isConnected = !!db.connections[0].readyState;
}
