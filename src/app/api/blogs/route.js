import { NextResponse } from "next/server";
import { connectDB } from "../../../utils/db";
import Blog from "../../../models/Blog";

export async function GET() {
  await connectDB();
  const blogs = await Blog.find();
  return NextResponse.json(blogs);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newBlog = new Blog(data);
  await newBlog.save();
  return NextResponse.json(newBlog);
}
