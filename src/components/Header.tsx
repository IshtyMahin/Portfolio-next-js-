"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaDownload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const isActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md py-2 shadow-lg"
          : "bg-gray-900/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center group"
          >
            <div className="relative">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-purple-400/30 group-hover:border-purple-400/80 transition-all duration-300 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover"
                  src="/images/myprofile.jpg"
                  alt="Profile Picture"
                />
                <div className="absolute top-0 left-0 w-3 h-3 bg-purple-500/50 rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400/50 rounded-full"></div>
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-purple-400/20 transition-all duration-300 animate-spin-slow"></div>
            </div>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl md:text-2xl font-bold ml-3 bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent italic"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              Ishtiaq Uddin
            </motion.h1>
          </motion.div>

          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={item.href}
                    className={`relative text-gray-300 hover:text-white px-1 py-2 transition-colors duration-300 group italic ${
                      isActive(item.href) ? "text-white font-semibold" : ""
                    }`}
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: isActive(item.href) ? 600 : 500,
                    }}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 ${
                        isActive(item.href)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * navItems.length }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/resume.pdf"
                  download
                  className="flex items-center bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all shadow-lg shadow-purple-500/20 italic"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                  }}
                >
                  <FaDownload className="mr-2" />
                  Resume
                </Link>
              </motion.li>
            </ul>
          </nav>

          <motion.button
            className="md:hidden text-gray-300 focus:outline-none z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </motion.button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed top-20 left-0 right-0 bg-gray-900 backdrop-blur-lg pt-6 pb-8 px-6 z-40"
              style={{ height: "calc(100vh - 80px)" }}
            >
              <ul className="flex flex-col space-y-6 h-full">
                {navItems.map((item) => (
                  <motion.li
                    key={`mobile-${item.name}`}
                    variants={mobileMenuVariants}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className={`block text-2xl py-3 transition-colors ${
                        isActive(item.href)
                          ? "text-white font-semibold"
                          : "text-gray-300 hover:text-white"
                      }`}
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic",
                        fontWeight: isActive(item.href) ? 600 : 500,
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        {item.name}
                        {isActive(item.href) && (
                          <span className="ml-3 w-2 h-2 rounded-full bg-cyan-400"></span>
                        )}
                      </div>
                      <span
                        className={`block h-px mt-2 ${
                          isActive(item.href)
                            ? "bg-gradient-to-r from-purple-400 to-cyan-400"
                            : "bg-gray-700"
                        }`}
                      ></span>
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  variants={mobileMenuVariants}
                  transition={{ duration: 0.2 }}
                  className="mt-auto pt-6" 
                >
                  <Link
                    href="/path/to/cv.pdf"
                    download
                    className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-lg text-xl hover:from-purple-700 hover:to-purple-900 transition-all italic"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 600,
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaDownload className="mr-3" />
                    Download CV
                  </Link>
                </motion.li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
