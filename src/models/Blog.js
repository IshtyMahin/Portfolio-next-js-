import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
  title: String,
  content: String,
  author: String,
  image: String,
  tags: [String],
  readTime: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema);
