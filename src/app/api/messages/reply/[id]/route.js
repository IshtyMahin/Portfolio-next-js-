import { NextResponse } from "next/server";
import { connectDB } from "../../../../../utils/db";
import Message from "../../../../../models/Message";
import { createReplyTemplate, sendEmail } from "../../../../../utils/sendEmail";

export async function POST(request, { params }) {
  try {
    await connectDB();

    const { reply } = await request.json();

    if (!reply?.trim()) {
      return NextResponse.json(
        { message: "Reply content is required" },
        { status: 400 }
      );
    }

    const message = await Message.findByIdAndUpdate(
      params.id,
      {
        status: "replied",
        reply,
        repliedAt: new Date(),
      },
      { new: true }
    );

    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    const htmlContent = createReplyTemplate(message.name, reply);

    const emailSent = await sendEmail({
      to: message.email,
      subject: `Re: Your message to ${process.env.USER_NAME || "us"}`,
      text: `Hello ${message.name},\n\n${reply}\n\nBest regards,\n${
        process.env.USER_NAME || "Our Team"
      }`,
      html: htmlContent,
    });

    if (!emailSent) {
      return NextResponse.json(
        { message: "Message saved but failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Reply sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending reply:", error);
    return NextResponse.json(
      { message: "Failed to process your request" },
      { status: 500 }
    );
  }
}
