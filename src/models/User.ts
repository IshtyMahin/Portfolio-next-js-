import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  username: String,
  email: String,
  password: String,
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
