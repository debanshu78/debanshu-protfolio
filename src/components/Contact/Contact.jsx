import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaQuoteLeft,
} from "react-icons/fa";

const Contact = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [anonymousResponse, setAnonymousResponse] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const randomResponses = [
    "🧠 You asked. I’m thinking...",
    "📝 Message dropped in the vault.",
    "📫 That’s between us now.",
    "🤐 Secrets are safe here.",
  ];

  const handleAnonymousSubmit = (e) => {
    e.preventDefault();
    setAnonymousResponse(
      randomResponses[Math.floor(Math.random() * randomResponses.length)],
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    e.target.reset();
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    e.target.reset();
  };

  return (
    <section
      id="contact"
      className="font-poppins relative min-h-[80vh] bg-gradient-to-br from-[#f5f5f5] to-[#e4e4e7] px-6 py-16 text-gray-800 transition-all duration-500 dark:bg-[#0d1117] dark:bg-gradient-to-br dark:from-[#0b0f19] dark:to-[#111827] dark:text-white"
    >
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
        className="mb-8 pb-5 text-center text-3xl font-bold"
      >
        Whether it’s professional or personal <br /> I’d love to hear from you.
      </motion.h2>

      <div className="mx-auto grid min-h-[500px] max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="mb-8 flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab("contact")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                activeTab === "contact"
                  ? "bg-blue-600 text-white dark:bg-[var(--color-neon-green)] dark:text-black"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              Let’s Create Something Cool
            </button>
            <button
              onClick={() => setActiveTab("anonymous")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                activeTab === "anonymous"
                  ? "bg-blue-600 text-white dark:bg-[var(--color-neon-green)] dark:text-black"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              Say Something Without Saying Who You Are
            </button>
          </div>

          {activeTab === "contact" ? (
            <form
              onSubmit={handleContactSubmit}
              className="mx-auto max-w-xl space-y-4 text-left"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:focus:ring-[var(--color-neon-green)]"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:focus:ring-[var(--color-neon-green)]"
              />
              <select
                name="subject"
                className="w-full rounded-md border border-gray-300 p-3 dark:border-gray-600 dark:bg-[#0d1117] dark:text-white"
              >
                <option>General</option>
                <option>Collaboration</option>
                <option>Freelance Work</option>
              </select>
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="4"
                className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:focus:ring-[var(--color-neon-green)]"
              ></textarea>
              <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-gray-600 sm:flex-row sm:gap-8 dark:text-gray-400">
                {/* Send Button */}
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-6 py-2 text-white shadow transition hover:bg-blue-700 dark:bg-[var(--color-neon-green)] dark:text-black dark:hover:brightness-110"
                >
                  Send
                </button>

                {/* --or-- centered vertically */}
                <div className="flex h-full items-center justify-center font-bold whitespace-nowrap text-white">
                  --OR--
                </div>

                {/* Contact Info */}
                <div className="flex flex-col text-center leading-relaxed sm:text-left">
                  <div className="text-gray-600 dark:text-gray-400">
                    Reach out directly at
                  </div>
                  <a
                    href="mailto:debanshurout.dev@gmail.com"
                    className="font-medium text-blue-600 hover:underline dark:text-[var(--color-neon-green)]"
                  >
                    debanshurout.dev@gmail.com
                  </a>
                  <a
                    href="tel:+919660907679"
                    className="font-medium text-blue-600 hover:underline dark:text-[var(--color-neon-green)]"
                  >
                    +91 96609 07679
                  </a>
                </div>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleAnonymousSubmit}
              className="mx-auto max-w-xl space-y-4 text-left"
            >
              <input
                type="text"
                name="alias"
                placeholder="Alias (optional)"
                className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:focus:ring-[var(--color-neon-green)]"
              />
              <textarea
                name="anonMessage"
                placeholder="Drop your thoughts (no crimes, pls)"
                required
                rows="5"
                className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:focus:ring-[var(--color-neon-green)]"
              ></textarea>
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 dark:bg-[var(--color-neon-green)] dark:text-black dark:hover:opacity-90"
              >
                <span>Submit</span>
                <FaPaperPlane />
              </button>
              {anonymousResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-2 text-center text-sm text-gray-600 italic dark:text-gray-400"
                >
                  {anonymousResponse}
                </motion.div>
              )}
            </form>
          )}
        </motion.div>

        {/* Right Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center justify-center gap-8 text-center lg:border-l lg:pl-12"
        >
          <div className="space-y-3">
            <p className="text-xl leading-relaxed font-medium text-gray-700 dark:text-gray-300">
              <FaQuoteLeft className="mr-2 inline text-blue-500 dark:text-[var(--color-neon-green)]" />
              {activeTab === "contact"
                ? "Feel free to reach out — I’m always up for a new challenge or conversation."
                : "Scream at me, drop your thoughts, or send a random idea—it's top secret! 🤫💥 Feedback, mystery, and pure chaos welcome. 🚀💬 Just hit send and disappear like a ninja in a cloud of confetti! 🥷✨"}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Find me online</h3>
            <div className="flex justify-center gap-6 text-2xl">
              <a
                href="https://github.com/yourprofile"
                className="hover:text-blue-600 dark:hover:text-[var(--color-neon-green)]"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                className="hover:text-blue-600 dark:hover:text-[var(--color-neon-green)]"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com/yourprofile"
                className="hover:text-blue-600 dark:hover:text-[var(--color-neon-green)]"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white shadow-lg dark:bg-[var(--color-neon-green)] dark:text-black"
        >
          <FaPaperPlane />
          <span>Message sent. Thanks!</span>
        </motion.div>
      )}
    </section>
  );
};

export default Contact;
