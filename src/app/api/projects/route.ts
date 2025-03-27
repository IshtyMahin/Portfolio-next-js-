import { connectDB } from "@/utils/db";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

export async function GET() {
  await connectDB();
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const data = await req.json();

    if (data.images && Array.isArray(data.images)) {
      for (const image of data.images) {
        if (typeof image !== "string" || !image.startsWith("data:image")) {
          return NextResponse.json(
            { message: "Invalid image format" },
            { status: 400 }
          );
        }
        if (image.length > MAX_IMAGE_SIZE) {
          return NextResponse.json(
            { message: "One or more images exceed the size limit" },
            { status: 400 }
          );
        }
      }
    }

    const newProject = new Project({
      title: data.title,
      description: data.description,
      tags: data.tags || [],
      githubFrontend: data.githubFrontend,
      githubBackend: data.githubBackend,
      livePreview: data.livePreview,
      images: data.images || [],
    });

    await newProject.save();
    return NextResponse.json(newProject);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create project",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

