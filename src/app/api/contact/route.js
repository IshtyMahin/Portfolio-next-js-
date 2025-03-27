import { NextResponse } from "next/server";
import Message from "@/models/Message";
import { connectDB } from "@/utils/db";

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newMessage = new Message({
      name,
      email,
      message,
      status: "unread",
    });

    await newMessage.save();

    return NextResponse.json(
      { message: "Message received successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { message: "Failed to save message" },
      { status: 500 }
    );
  }
}
