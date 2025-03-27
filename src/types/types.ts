// types/types.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  githubFrontend: string;
  githubBackend: string;
  livePreview: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface Blog extends Document {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  content: string;
  author?: string;
}