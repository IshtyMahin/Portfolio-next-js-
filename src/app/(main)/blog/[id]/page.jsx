"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MarkdownRenderer from "../../../../components/MarkdownRender";

export default function BlogPostPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/blogs/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError(err.message);
        router.replace("/404"); // Redirect to 404 if post not found
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl pt-[20vh]">
        <div className="animate-pulse space-y-6">
          <div className="h-64 md:h-80 bg-gray-800 rounded-2xl"></div>
          <div className="h-8 bg-gray-800 rounded w-3/4"></div>
          <div className="h-4 bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-800 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl pt-[20vh] text-center">
        <div className="bg-gray-900 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Error Loading Post
          </h2>
          <p className="text-gray-400 mb-6">{error || "Post not found"}</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl pt-[20vh]">
      <article className="bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 rounded-2xl overflow-hidden border border-gray-800/50 hover:border-pink-500/30 transition-all duration-500">
        {post.image && (
          <div className="relative h-64 md:h-80 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-pink-400">{formattedDate}</span>
            <span className="text-xs bg-gray-800/60 text-gray-400 px-3 py-1 rounded-full">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-800/60 text-pink-300 px-3 py-1 rounded-full border border-gray-700/50 hover:border-pink-400/50 transition-all"
              >
                {tag}
              </span>
            ))}
          </div>

          <MarkdownRenderer content={post.content} />

          <div className="mt-12 pt-6 border-t border-gray-800/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center text-xl font-bold">
              {post.author?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200">{post.author}</p>
              <p className="text-xs text-gray-400">Author</p>
            </div>
          </div>
        </div>
      </article>

      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to all articles
        </Link>
      </div>
    </div>
  );
}
