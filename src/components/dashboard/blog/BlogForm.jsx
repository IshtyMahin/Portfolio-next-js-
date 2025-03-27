"use client";
import MarkdownEditor from "@/components/dashboard/MarkdownEditor";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function BlogForm({ mode, blogData }) {
  const [title, setTitle] = useState(blogData?.title || "");
  const [content, setContent] = useState(blogData?.content || "");
  const [author, setAuthor] = useState(blogData?.author || "");
  const [readTime, setReadTime] = useState(blogData?.readTime || "");
  const [image, setImage] = useState(blogData?.image || "");
  const [tags, setTags] = useState(blogData?.tags || []);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImageUploading(true);
    setError("");

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result);
      }
      setIsImageUploading(false);
    };
    reader.onerror = () => {
      setError("Failed to read image file");
      setIsImageUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const url = mode === "edit" ? `/api/blogs/${blogData?._id}` : "/api/blogs";
      const method = mode === "edit" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          author,
          readTime,
          tags,
          image,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${mode === "edit" ? "update" : "create"} blog`
        );
      }

      router.push("/dashboard/blogs");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-400">
            {mode === "edit" ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          <Link
            href="/dashboard/blogs"
            className="text-gray-400 hover:text-purple-400 transition duration-300 flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Back to Blogs
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Author
            </label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Read Time
            </label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="e.g. 5 min read"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex">
              <input
                type="text"
                className="flex-grow bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Add tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
              />
              <button
                onClick={addTag}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-r-lg transition duration-300"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center bg-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-300 mb-2">
            Featured Image
          </label>
          <div className="flex items-center gap-4">
            {image && (
              <div className="relative">
                <img
                  src={image}
                  alt="Preview"
                  className="h-24 w-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
            <label className="cursor-pointer">
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 hover:bg-gray-700 transition duration-300">
                {isImageUploading
                  ? "Uploading..."
                  : image
                  ? "Change Image"
                  : "Upload Image"}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={isImageUploading}
              />
            </label>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Recommended size: 1200x630 pixels
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-300 mb-2">
            Content *
          </label>
          <MarkdownEditor value={content} onChange={setContent} />
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href="/dashboard/blogs"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition duration-300 ease-in-out"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`${
              isSubmitting
                ? "bg-purple-700 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            } text-white px-6 py-3 rounded-xl transition duration-300 ease-in-out flex items-center`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {mode === "edit" ? "Updating..." : "Publishing..."}
              </>
            ) : mode === "edit" ? (
              "Update Blog"
            ) : (
              "Publish Blog"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
