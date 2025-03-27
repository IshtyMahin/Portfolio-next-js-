"use client";
import React from "react";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiGithub,
  FiExternalLink,
  FiLoader,
  FiTrash2,
  FiEdit,
} from "react-icons/fi";
import Image from "next/image";

export default function ProjectDetail({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        setProject(data);
  const [project, setProject] = useState(null);
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [resolvedParams.id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/projects/${resolvedParams.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      router.push("/dashboard/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-100">
        <FiLoader className="animate-spin text-4xl text-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">
            {error}
          </div>
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mt-4 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-8">
        <div className="container mx-auto max-w-4xl">
          <p className="text-gray-400">Project not found</p>
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mt-4 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 md:p-8">
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete "{project.title}"? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition flex items-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <FiLoader className="animate-spin mr-2" />
                ) : (
                  <FiTrash2 className="mr-2" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-400">
            {project.title}
          </h1>
          <Link
            href="/dashboard/projects"
            className="text-gray-400 hover:text-purple-400 transition duration-300 flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </div>

        <div className="mb-8">
          <p className="text-gray-300 text-lg mb-6">{project.description}</p>

          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-800 px-3 py-1 rounded-full text-sm text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {project.githubFrontend && (
              <a
                href={project.githubFrontend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
              >
                <FiGithub className="mr-2" />
                Frontend Code
              </a>
            )}
            {project.githubBackend && (
              <a
                href={project.githubBackend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
              >
                <FiGithub className="mr-2" />
                Backend Code
              </a>
            )}
            {project.livePreview && (
              <a
                href={project.livePreview}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
              >
                <FiExternalLink className="mr-2" />
                Live Preview
              </a>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600 text-red-400 hover:text-red-300 px-6 py-3 rounded-xl transition duration-300 ease-in-out"
          >
            <FiTrash2 />
            Delete Project
          </button>
          <Link
            href={`/dashboard/projects/${resolvedParams.id}/edit`}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition duration-300 ease-in-out"
          >
            <FiEdit />
            Edit Project
          </Link>
        </div>
      </div>
    </div>
  );
}
