import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema({
  title: String,
  description: String,
  images: [String],
  tags: [String],
  githubFrontend: String,
  githubBackend: String,
  livePreview: String,
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
