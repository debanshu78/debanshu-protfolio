import { FaGithub, FaArrowUp, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f9fafb] px-4 py-16 dark:bg-[#0f172a]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-2">
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Project Details
          </h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Here, you'll find details about the projects I've worked on, the
            technologies I use, and my journey as a developer.
          </p>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Tech Stack Used:
            </p>

            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Frontend */}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Frontend:
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-white">
                    React
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-white">
                    Tailwind CSS
                  </span>
                </div>
              </div>

              {/* Backend */}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Backend:
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-white">
                    Node.js
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-white">
                    Express
                  </span>
                </div>
              </div>

              {/* Database */}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Database:
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-white">
                    PostgreSQL
                  </span>
                </div>
              </div>

              {/* Services */}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Services:
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-white">
                    GitHub
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-white">
                    Netlify
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4">
              <span className="font-semibold text-gray-900 dark:text-white">
                Project Link:
              </span>{" "}
              <a
                href="https://github.com/your-username/your-project"
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-neon-green text-blue-600 hover:underline"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex h-full flex-col justify-between text-center"
        >
          {/* Back to Top Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-2 mb-6 flex items-center justify-center"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg text-gray-700 transition-colors duration-300 hover:text-blue-600 dark:text-white dark:hover:text-[var(--color-neon-green)]"
            >
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                <FaArrowUp />
              </motion.span>
              Back to Top
            </button>
          </motion.div>

          {/* Centered Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-grow items-center justify-center"
          >
            <p className="text-xl leading-relaxed font-medium text-gray-700 dark:text-gray-300">
              <FaQuoteLeft className="mr-2 inline text-blue-500 dark:text-[var(--color-neon-green)]" />
              Keep coding. Keep creating.
            </p>
          </motion.div>

          <div className="h-6" />
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-gray-700 dark:text-gray-300">
          © {currentYear} Debanshu Rout. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
