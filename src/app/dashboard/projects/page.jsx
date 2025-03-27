"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiArrowRight, FiLoader } from "react-icons/fi";

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  githubFrontend?: string;
  githubBackend?: string;
  livePreview?: string;
  images?: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 md:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
          >
            My Projects
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/dashboard/projects/new-project"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20"
            >
              <FiPlus className="text-lg" />
              Add New Project
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FiLoader className="animate-spin text-4xl text-purple-500" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2 text-purple-400">
                        {project.title}
                      </h2>
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      {project.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block bg-gray-700/80 px-3 py-1 rounded-full text-xs text-purple-300 border border-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/dashboard/projects/${project._id}`}
                      className="flex items-center text-purple-400 hover:text-purple-300 transition duration-300 mt-auto"
                    >
                      View Details <FiArrowRight className="ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-xl mb-4">
              No projects found. Create your first one!
            </p>
            <Link
              href="/dashboard/projects/new-project"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition duration-300"
            >
              <FiPlus />
              Add New Project
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
