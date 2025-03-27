import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/db";
import Message from "../../../../models/Message";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { status } = await request.json();

    const updatedMessage = await Message.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!updatedMessage) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { message: "Failed to update message" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const deletedMessage = await Message.findByIdAndDelete(params.id);

    if (!deletedMessage) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { message: "Failed to delete message" },
      { status: 500 }
    );
  }
}
