"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-400">
            My Blog Posts
          </h1>
          <Link
            href="/dashboard/blogs/new-blog"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition duration-300 ease-in-out"
          >
            + Add New Blog
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-purple-500/20 transition duration-300"
            >
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {blog.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold mb-2 text-purple-400">
                  {blog.title}
                </h2>
                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <span>{blog.author}</span>
                  <span>{blog.readTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/dashboard/blogs/${blog._id}`}
                    className="text-purple-400 hover:text-purple-300 transition duration-300"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">
              No blog posts yet. Create your first one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
