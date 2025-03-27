import mongoose, { Schema, Document } from "mongoose";

interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  readTime: string;
  image: string;
  tags: string[];
  createdAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: String,
  content: String,
  author: String,
  image: String,
  tags: [String],
  readTime: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema);
