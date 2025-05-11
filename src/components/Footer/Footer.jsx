import { FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear(); // Current year dynamically

  return (
    <section
      id="footer"
      className="bg-[#f9fafb] px-4 py-16 transition-all duration-500 dark:bg-[#0f172a]"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
        {/* Left Panel: Project Details */}
        <div className="space-y-6 text-center md:text-left">
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Tech Stack Used:
            </p>
            <div className="text-gray-600 dark:text-gray-400">
              React
              <br />
              Tailwind CSS
              <br />
              Node.js
              <br />
              Express
              <br />
              PostgreSQL
              <br />
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Project Link:
            </p>
            <a
              href="https://github.com/yourusername/yourproject"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-neon-green dark:hover:text-neon-yellow text-blue-600 hover:text-blue-800"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Right Panel: Back to Top & Quote */}
        <div className="space-y-6 text-center md:text-right">
          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="dark:hover:text-neon-green text-lg text-gray-600 hover:text-blue-600 dark:text-gray-300"
          >
            Back to Top <FaArrowUp className="ml-2 inline text-base" />
          </button>

          {/* Motivational Quote */}
          <p className="mt-6 text-lg text-gray-800 dark:text-white">
            {`{>_} Keep coding. Keep creating.`}
          </p>
        </div>
      </div>

      {/* Footer: Copyright */}
      <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {currentYear} Debanshu Rout. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Footer;
