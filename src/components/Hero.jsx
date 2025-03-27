"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCodepen,
  FaCode,
  FaCodeBranch,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaDownload,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const socialLinks = [
  {
    href: "https://codeforces.com/profile/_Ishtiaq_Uddin_",
    icon: <FaCodepen className="text-xl" />,
    label: "Codeforces",
    color: "text-red-400 hover:text-red-300",
  },
  {
    href: "https://www.codechef.com/users/ishtiaq_mahin",
    icon: <FaCode className="text-xl" />,
    label: "CodeChef",
    color: "text-yellow-400 hover:text-yellow-300",
  },
  {
    href: "https://leetcode.com/yourprofile",
    icon: <FaCodeBranch className="text-xl" />,
    label: "LeetCode",
    color: "text-orange-400 hover:text-orange-300",
  },
  {
    href: "https://github.com/IshtyMahin",
    icon: <FaGithub className="text-xl" />,
    label: "GitHub",
    color: "text-gray-200 hover:text-gray-100",
  },
  {
    href: "https://www.linkedin.com/in/ishtiaq-uddin-090163241/",
    icon: <FaLinkedin className="text-xl" />,
    label: "LinkedIn",
    color: "text-blue-400 hover:text-blue-300",
  },
  {
    href: "https://www.facebook.com/ishtiaquddin.mahin.3/",
    icon: <FaFacebook className="text-xl" />,
    label: "Facebook",
    color: "text-blue-500 hover:text-blue-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
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
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)",
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.98,
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const letterVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function Hero() {
  const descriptionLines = [
    "Passionate about crafting seamless digital experiences through innovative web solutions.",
    "Turning ideas into reality with expertise in React, Next.js, and express.js.",
    "Building scalable, high-performance web applications that make an impact.",
  ];

  const jobTitles = [
    "Full Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "Django Developer",
    "Competitive Programmer",
    "Computer Science & Engineering Student",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => (prev === "up" ? "down" : "up"));
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % jobTitles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [jobTitles.length]);

  const title = "Hey, I'M ISHTIAQ UDDIN";

  return (
    <section id="home" className=" overflow-hidden pt-[15vh] min-h-screen">
      <div className="container mx-auto min-h-[85vh] flex flex-col md:flex-row items-center px-4 md:px-8 relative z-10">
        <motion.div
          className="md:fixed md:left-6 lg:left-8 mb-8 md:mb-0"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <ul className="flex md:flex-col gap-4 md:gap-6">
            {socialLinks.map((social, index) => (
              <motion.li
                key={index}
                className="relative group"
                variants={itemVariants}
                whileHover="hover"
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block ${social.color} transition-colors duration-300`}
                  aria-label={social.label}
                >
                  <motion.div
                    className="p-3 bg-gray-800/50 hover:bg-gray-700/70 rounded-full backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.div>
                </Link>
                <motion.div
                  className="absolute hidden md:block opacity-0 text-white bg-gray-800/90 text-sm px-3 py-1.5 rounded-lg shadow-xl z-10 
                  left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap
                  before:absolute before:w-2 before:h-2 before:bg-gray-800/90 before:rotate-45 before:-left-1 before:top-1/2 before:-translate-y-1/2"
                  initial={{ opacity: 0, x: -10 }}
                  variants={{
                    hover: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.2 },
                    },
                  }}
                >
                  {social.label}
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="flex-1 text-center md:text-left mx-4 md:mx-0">
          <div className="mx-auto md:ml-12 lg:ml-24">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-white mb-4"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
              }}
            >
              <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                {title.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    style={{ display: "inline-block" }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.div
              className="text-2xl md:text-3xl font-semibold text-gray-300 my-4 h-10 md:h-12 overflow-hidden relative"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
              }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                {jobTitles.map(
                  (title, index) =>
                    currentTitleIndex === index && (
                      <motion.h2
                        key={title}
                        custom={direction}
                        initial={{
                          y: direction === "up" ? 50 : -50,
                          opacity: 0,
                        }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.5,
                            ease: "easeInOut",
                          },
                        }}
                        exit={{
                          y: direction === "up" ? -50 : 50,
                          opacity: 0,
                          transition: {
                            duration: 0.5,
                            ease: "easeInOut",
                          },
                        }}
                        className="w-full text-center md:text-left absolute"
                      >
                        {title}
                      </motion.h2>
                    )
                )}
              </AnimatePresence>
            </motion.div>

            <div
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
              }}
            >
              {descriptionLines.map((line, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="overflow-hidden"
                >
                  <motion.p
                    whileHover={{
                      x: 5,
                      color: "#d1d5db",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {line}
                  </motion.p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <Link
                  href="/projects"
                  className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 font-medium flex items-center justify-center gap-2 italic"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                  }}
                >
                  <motion.span
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                    className="flex items-center gap-2"
                  >
                    View My Work
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} transition={{ delay: 0.1 }}>
                <Link
                  href="/resume.pdf"
                  download
                  className="px-8 py-3.5 border-2 border-purple-600/50 text-white rounded-xl hover:bg-purple-600/10 transition-all duration-300 font-medium flex items-center justify-center gap-2 italic"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                  }}
                >
                  <motion.span
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                    className="flex items-center gap-2"
                  >
                    <FaDownload className="text-lg" />
                    Download CV
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
