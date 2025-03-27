"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? "" : tag);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 pt-[20vh]">
        <div className="text-center mb-16">
          <div className="h-12 w-64 bg-gray-800 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-96 bg-gray-800 rounded-full mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-2xl h-96 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-[20vh]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r p-1 from-purple-400 to-cyan-300 bg-clip-text text-transparent italic">
            Blog & Articles
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto italic">
          Insights, tutorials and thoughts from our team
        </p>
      </motion.div>

      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-6 py-3 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            )}
          </div>
          <select
            className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {(selectedTag || searchQuery) && (
          <div className="flex justify-center items-center gap-3">
            <div className="bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 flex items-center gap-2">
              {selectedTag && (
                <span className="flex items-center gap-1">
                  <span className="text-pink-400">Tag:</span>
                  <span className="text-gray-300">{selectedTag}</span>
                  <button
                    onClick={() => setSelectedTag("")}
                    className="text-gray-400 hover:text-gray-200 ml-1"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="flex items-center gap-1">
                  {selectedTag && <span className="text-gray-500 mx-1">•</span>}
                  <span className="text-cyan-400">Search:</span>
                  <span className="text-gray-300">"{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-gray-400 hover:text-gray-200 ml-1"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setSelectedTag("");
                setSearchQuery("");
              }}
              className="text-sm text-gray-400 hover:text-gray-300 flex items-center gap-1 underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-2xl text-gray-400 mb-4">No articles found</h3>
          <p className="text-gray-500">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogCard
              key={post._id}
              post={post}
              index={index}
              onTagClick={handleTagClick}
              selectedTag={selectedTag}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BlogCard({ post, index, onTagClick, selectedTag }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-gradient-to-br from-gray-900/50 to-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-400/20 transition-all duration-300 h-full flex flex-col group shadow-lg hover:shadow-xl hover:shadow-cyan-400/5"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="text-xs font-medium bg-gray-900/80 text-cyan-300 px-3 py-1.5 rounded-full backdrop-blur-sm border border-cyan-400/20">
            {post.readTime}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <span className="text-xs font-light text-gray-400 mb-3 tracking-wider">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>

        <h3 className="text-2xl font-medium text-gray-100 mb-4 leading-snug tracking-tight">
          {post.title}
        </h3>

        <div className="flex items-center gap-2 mb-5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-xs font-bold text-gray-900">
            {post.author.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-gray-300">{post.author}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                onTagClick(tag);
              }}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                selectedTag === tag
                  ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 shadow-cyan-400/10"
                  : "bg-gray-800/40 text-gray-400 hover:bg-gray-800 hover:text-gray-200 border border-gray-700/50"
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-800/50">
          <Link
            href={`/blog/${post._id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <span className="relative">
              Read full article
              <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
