"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { FaServer } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";


export default function ProjectCard({ project }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [autoCycle, setAutoCycle] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    let interval;

    if (autoCycle && project.images.length > 1) {
      interval = setInterval(() => {
        setDirection("right");
        setActiveImage((prev) => (prev + 1) % project.images.length);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoCycle, project.images.length]);

  const handleImageChange = (newIndex) => {
    setDirection(newIndex > activeImage ? "right" : "left");
    setActiveImage(newIndex);
  };

  const handleHoverStart = () => {
    setIsHovered(true);
    if (project.images.length > 1) {
      setAutoCycle(true);
    }
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    setAutoCycle(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const imageContainerVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  const titleVariants = {
    hover: {
      backgroundPosition: "100% 50%",
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const tagVariants = {
    hover: {
      y: -3,
      backgroundColor: "rgba(236, 72, 153, 0.2)",
      borderColor: "rgba(236, 72, 153, 0.5)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const linkVariants = {
    hover: {
      x: 5,
      color: "#ec4899",
      transition: {
        duration: 0.3,
      },
    },
  };

  const transition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.5 },
    scale: { duration: 0.5 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="w-full h-[500px] mx-auto mb-8 relative"
    >
      <div className="relative h-full bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 rounded-2xl overflow-hidden border border-gray-800/50 hover:border-pink-500/30 transition-all duration-500 group flex flex-col">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -inset-8 opacity-0 group-hover:opacity-100 blur-xl"
            style={{
              background:
                "radial-gradient(circle at center, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <motion.div
          className="relative h-2/3 overflow-hidden"
          variants={imageContainerVariants}
        >
          {project.images.length > 0 ? (
            <>
              <div className="absolute inset-0">
                <AnimatePresence custom={direction} initial={false}>
                  <motion.div
                    key={activeImage}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.images[activeImage]}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"
                animate={{
                  opacity: isHovered ? 0.6 : 0.8,
                }}
                transition={{ duration: 0.4 }}
              />

              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {project.images.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleImageChange(idx)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === activeImage
                        ? "bg-pink-500 w-6"
                        : "bg-gray-600/80 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <span className="text-gray-600 text-lg italic">
                Project Preview
              </span>
            </div>
          )}
        </motion.div>

        <div className="h-2/5 p-6 flex flex-col justify-between bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90 relative z-10">
          <div>
            <motion.h3
              variants={titleVariants}
              className="text-2xl font-bold mb-4 relative"
              style={{
                background: "linear-gradient(90deg, #ec4899, #a855f7, #ec4899)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.025em",
              }}
            >
              {project.title}
            </motion.h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 4).map((tag) => (
                <motion.span
                  key={tag}
                  variants={tagVariants}
                  whileHover="hover"
                  className="text-xs bg-gray-800/60 text-pink-300 px-3 py-2 rounded-lg border border-gray-700/50 hover:border-pink-400/50 transition-all"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-800/50">
            <div className="flex gap-3">
              {project.githubFrontend && (
                <motion.a
                  href={project.githubFrontend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <FiGithub className="text-xl" />
                </motion.a>
              )}

              {project.githubBackend && (
                <motion.a
                  href={project.githubBackend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <FaServer className="text-xl" />
                </motion.a>
              )}
            </div>

            {project.livePreview && (
              <motion.a
                href={project.livePreview}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-pink-400 transition-colors"
                variants={linkVariants}
                whileHover="hover"
              >
                <span>Live Demo</span>
                <FiExternalLink className="text-lg" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
