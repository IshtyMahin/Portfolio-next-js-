
import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/db";
import Project from "../../../../models/Project";
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

export async function GET(req, { params }) {
  await connectDB();
  try {
    const project = await Project.findById(params.id);
    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching project" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
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

    const updatedProject = await Project.findByIdAndUpdate(
      params.id,
      {
        $set: {
          title: data.title,
          description: data.description,
          tags: data.tags || [],
          githubFrontend: data.githubFrontend,
          githubBackend: data.githubBackend,
          livePreview: data.livePreview,
          images: data.images || [],
        },
      },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update project",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const deletedProject = await Project.findByIdAndDelete(params.id);

    if (!deletedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting project" },
      { status: 500 }
    );
  }
}
