"use client";
import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900/70 flex items-center justify-center">
        <FiLoader className="animate-spin text-4xl text-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900/70 flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-6 rounded-lg max-w-md text-center italic">
          Error: {error}
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <section
        id="projects"
        className="min-h-screen  py-25 px-20 overflow-hidden"
      >
        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text p-1 text-transparent italic">
                My Projects
              </span>
            </h2>
            <p
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Here are some of my recent projects. Each one was built with care
              and attention to detail.
            </p>
          </motion.div>

          {projects.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="gap-8 grid grid-cols-1 md:grid-cols-2 "
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p
                className="text-gray-400 text-xl italic"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                No projects found
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
