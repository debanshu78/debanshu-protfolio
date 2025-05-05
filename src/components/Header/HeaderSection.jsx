import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { HiOutlineDownload, HiOutlineUserAdd } from "react-icons/hi";

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayRole, setDisplayRole] = useState("");
  const roles = ["Full Stack Developer", "Full Stack Developer"];

  useEffect(() => {
    let isDeleting = false;
    let charIndex = 0;
    let typingInterval;

    const typeRole = () => {
      const currentRole = roles[roleIndex % roles.length];

      typingInterval = setTimeout(
        () => {
          if (isDeleting) {
            setDisplayRole(currentRole.substring(0, charIndex - 1));
            charIndex--;
          } else {
            setDisplayRole(currentRole.substring(0, charIndex + 1));
            charIndex++;
          }

          if (!isDeleting && charIndex === currentRole.length) {
            setTimeout(() => {
              isDeleting = true;
              typeRole();
            }, 1000);
          } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            setRoleIndex((prev) => (prev + 1) % roles.length);
          } else {
            typeRole();
          }
        },
        isDeleting ? 100 : 200,
      );
    };

    typeRole();
    return () => clearTimeout(typingInterval);
  }, [roleIndex]);

  return (
    <section
      id="home"
      className="font-poppins relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 py-16 text-center text-gray-800 dark:text-white"
    >
      {/* Background blob / glow */}
      <div className="absolute top-0 right-0 left-0 -z-10 h-full w-full bg-gradient-to-br from-blue-50 to-purple-100 dark:from-[#0b0f19] dark:to-[#111827]" />
      <div className="absolute top-[30%] left-[50%] -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-300 opacity-30 blur-3xl dark:bg-purple-800" />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        {/* Typing effect */}
        <h1 className="text-3xl font-bold">
          <span className="text-gray-800 dark:text-white">Hello World</span>
          <span className="dark:text-neon-green text-blue-600">,</span>
        </h1>

        {/* Name and role */}
        <h3 className="mt-2 text-3xl font-semibold text-gray-700 dark:text-gray-200">
          I am
          <span className="dark:text-neon-green ml-2 text-3xl font-bold text-blue-600">
            Debanshu Rout
          </span>
        </h3>

        <h3 className="mt-2 min-h-[2.5rem] text-2xl font-medium text-purple-600 dark:text-purple-400">
          {displayRole}
        </h3>

        {/* Personal Statement */}
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
          Fueled by code and curiosity—always learning, building, and solving.
          <br className="hidden sm:block" />
          Off the keyboard, you’ll find me traveling, vibing to music, and
          chasing small adventures.
        </p>

        {/* Signature Line */}
        <p className="mt-4 text-base text-gray-500 italic dark:text-gray-400">
          "Between lines of code and miles of road, I find my rhythm."
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="dark:border-neon-green dark:text-neon-green dark:hover:bg-neon-green inline-flex items-center gap-2 rounded-xl border border-blue-500 px-6 py-3 text-blue-600 transition-all hover:bg-blue-600 hover:text-white dark:hover:text-black"
          >
            <HiOutlineUserAdd className="text-xl" />
            Let’s Build Together
          </motion.a>
          <motion.a
            href="./Debanshu_Rout_Resume.pdf" // Replace with your actual file path
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-500 px-6 py-3 text-gray-700 transition-all hover:bg-gray-800 hover:text-white dark:border-gray-300 dark:text-white dark:hover:bg-white dark:hover:text-black"
          >
            <HiOutlineDownload className="text-xl" />
            Download Resume
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
