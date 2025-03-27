import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  reply?: string;
  repliedAt?: Date;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["unread", "read", "replied", "archived"],
      default: "unread",
    },
    reply: { type: String },
    repliedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);
