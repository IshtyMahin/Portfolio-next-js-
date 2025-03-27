"use client";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaJsSquare,
  FaReact,
  FaPython,
  FaDatabase,
} from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiDaisyui,
  SiDjango,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiRedux,
  SiShadcnui,
  SiTailwindcss,
} from "react-icons/si";
import { FaDownload } from "react-icons/fa";

const About = () => {
  const skills = [
    { name: "HTML5", icon: <FaHtml5 />, color: "text-orange-500" },
    { name: "CSS3", icon: <FaCss3Alt />, color: "text-blue-500" },
    { name: "Bootstrap", icon: <FaBootstrap />, color: "text-purple-500" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-400" },
    { name: "JavaScript", icon: <FaJsSquare />, color: "text-yellow-400" },
    { name: "React.js", icon: <FaReact />, color: "text-blue-400" },
    { name: "Redux", icon: <SiRedux />, color: "text-blue-400" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "text-white" },
    { name: "C++", icon: <SiCplusplus />, color: "text-blue-600" },
    { name: "C", icon: <SiC />, color: "text-blue-400" },
    { name: "Python", icon: <FaPython />, color: "text-blue-300" },
    { name: "Django", icon: <SiDjango />, color: "text-green-700" },
    { name: "Django REST", icon: <SiDjango />, color: "text-green-600" },
    { name: "SQL", icon: <FaDatabase />, color: "text-blue-400" },
    { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500" },
    { name: "Mongoose", icon: <SiMongoose />, color: "text-red-500" },
    { name: "Express.js", icon: <SiExpress />, color: "text-gray-300" },
    { name: "DaisyUI", icon: <SiDaisyui />, color: "text-purple-400" },
    { name: "ShadCN", icon: <SiShadcnui />, color: "text-blue-400" },
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="about"
      className="min-h-screen pt-24 pb-20 px-4 md:px-8 text-white"
    >
      <div className="container mx-auto">
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
              About Me
            </span>
          </h2>
          <p
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto italic"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Discover my journey, skills, and professional background
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <h3
              className="text-2xl md:text-3xl font-bold mb-6 italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              <span className="border-b-2 border-purple-500 inline-block pb-2">
                My Journey
              </span>
            </h3>

            <div
              className="space-y-6 text-gray-300 italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              <p className="text-lg leading-relaxed">
                I'm a passionate{" "}
                <span className="text-purple-400 font-medium">
                  Full Stack Developer
                </span>{" "}
                with expertise in building modern web applications. My journey
                in software development began during my university years, and
                I've been constantly expanding my skill set ever since.
              </p>

              <p className="text-lg leading-relaxed">
                I specialize in creating efficient, scalable solutions with
                clean code architecture. My approach combines technical
                excellence with user-centered design to deliver exceptional
                digital experiences.
              </p>

              <div className="mt-8">
                <h4
                  className="text-xl md:text-2xl font-bold mb-4 italic"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  <span className="border-b-2 border-purple-500 inline-block pb-2">
                    Education
                  </span>
                </h4>

                <div
                  className="space-y-4 pl-6 border-l-2 border-purple-500/30 italic"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  <div>
                    <h5 className="text-lg font-semibold text-purple-300">
                      BSc in Computer Science and Engineering
                    </h5>
                    <p className="text-gray-400">
                      Rangamati Science and Technology University (2021-2025)
                    </p>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-purple-300">
                      Higher Secondary Certificate (HSC)
                    </h5>
                    <p className="text-gray-400">
                      Chittagong Cantonment Public College (2019)
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8"
              >
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center justify-center w-full md:w-auto bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all shadow-lg shadow-purple-500/20 italic"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                  }}
                >
                  <FaDownload className="mr-3" />
                  Download My Resume
                </a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1"
          >
            <h3
              className="text-2xl md:text-3xl font-bold mb-6 italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              <span className="border-b-2 border-purple-500 inline-block pb-2">
                My Skills
              </span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500/50 transition-all duration-300 flex items-center space-x-3 ${skill.color}`}
                >
                  <div className="shrink-0 text-2xl">{skill.icon}</div>
                  <span
                    className="font-medium text-white italic"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
