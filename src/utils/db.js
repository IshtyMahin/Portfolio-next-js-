import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL || "";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
};
