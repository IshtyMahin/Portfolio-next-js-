import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MarkdownRenderer from "@/components/MarkdownRender";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  readTime: string;
  tags: string[];
  image: string;
  author: string;
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getBlogPost(params.id);

  if (!post) {
    notFound();
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
            {post.tags.map((tag) => (
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
              {post.author.charAt(0).toUpperCase()}
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
