import mongoose, { Schema, Document } from "mongoose";

interface IProject extends Document {
  title: string;
  description: string;
  images: string[];
  tags: string[];
  githubFrontend: string;
  githubBackend: string;
  livePreview: string;
}

const ProjectSchema = new Schema<IProject>({
  title: String,
  description: String,
  images: [String],
  tags: [String],
  githubFrontend: String,
  githubBackend: String,
  livePreview: String,
});

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
