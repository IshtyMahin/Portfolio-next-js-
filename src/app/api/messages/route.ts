import { NextResponse } from "next/server";
import Message from "@/models/Message";
import { connectDB } from "@/utils/db";

export async function GET(request: Request) {
  try {
        await connectDB();

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter") || "all";

    let query = {};
    if (filter !== "all") {
      query = { status: filter };
    }

    const messages = await Message.find(query).sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { message: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
