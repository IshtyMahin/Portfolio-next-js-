"use client";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiShare2,
  FiBookmark,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MarkdownRenderer from "../../../../components/MarkdownRender";



export default function SingleBlog(params) {
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const { id } = params.params;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          next: { tags: ["blog"] },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message || "Error loading blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: "DELETE",
          next: { tags: ["blog"] },
        });

        if (!response.ok) {
          throw new Error("Failed to delete blog post");
        }

        router.push("/dashboard/blogs");
        router.refresh();
      } catch (err) {
        setError(err.message || "Error deleting blog post");
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-8">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-40 bg-gray-800 rounded"></div>
            <div className="h-10 bg-gray-800 rounded"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-red-900/20 border border-red-500 text-red-300 p-4 rounded-lg">
            {error}
          </div>
          <Link
            href="/dashboard/blogs"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mt-4 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-8">
        <div className="container mx-auto max-w-4xl">
          <p className="text-gray-400">Blog post not found</p>
          <Link
            href="/dashboard/blogs"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mt-4 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/dashboard/blogs"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Blogs
        </Link>

        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {blog.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-900/50 text-purple-400 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center text-gray-400 text-sm gap-4 mb-6">
            <div className="flex items-center">
              <FiCalendar className="mr-2" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2" />
              {blog.readTime + " min read" || "5 min read"}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                <FiBookmark />
              </button>
              <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                <FiShare2 />
              </button>
            </div>
            <div className="flex space-x-4">
              <Link
                href={`/dashboard/blogs/${blog._id}/edit`}
                className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <FiEdit />
              </Link>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>

        <MarkdownRenderer content={blog.content} />
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mr-4 text-xl font-bold">
              {blog.author?.charAt(0) || "A"}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                {blog.author || "Anonymous"}
              </h3>
              <p className="text-gray-400">Blog Author</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
