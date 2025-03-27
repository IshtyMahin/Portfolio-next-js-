import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
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

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
