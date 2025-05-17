import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaQuoteLeft, FaSyncAlt } from "react-icons/fa";

const defaultAvatar = "https://i.pravatar.cc/150?img=36";

export default function TestimonialForm() {
  const [form, setForm] = useState({
    avatar: "",
    name: "",
    email: "",
    role: "",
    company: "",
    linkedIn: "",
    message: "",
    fullMessage: "",
  });

  const [flipped, setFlipped] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFlip = () => setFlipped((f) => !f);

  const { avatar, name, email, role, company, linkedIn, message, fullMessage } =
    form;

  const avatarUrl = avatar.trim() || defaultAvatar;

  return (
    <section
      id="testimonial-form"
      className="font-poppins min-h-[80vh] bg-gradient-to-br from-[#f5f5f5] to-[#e4e4e7] px-6 py-16 text-gray-800 transition-all duration-500 dark:bg-[#0d1117] dark:bg-gradient-to-br dark:from-[#0b0f19] dark:to-[#111827] dark:text-white"
    >
      {/* Thank you message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 max-w-3xl text-center text-xl font-semibold"
      >
        🙏 Thanks so much for taking the time to share your thoughts! 💬✨
      </motion.div>

      {/* Grid: Left Form, Right Preview */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: Form */}
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl space-y-5 text-left"
          onSubmit={(e) => e.preventDefault()} // replace with real submit if needed
        >
          {/* Avatar URL (optional) */}
          <input
            name="avatar"
            type="url"
            placeholder="Avatar URL (optional)"
            value={avatar}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:text-white dark:focus:ring-[var(--color-neon-green)]"
          />
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            value={name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:text-white dark:focus:ring-[var(--color-neon-green)]"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:text-white dark:focus:ring-[var(--color-neon-green)]"
          />
          <input
            name="role"
            type="text"
            placeholder="Your Role"
            value={role}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:text-white dark:focus:ring-[var(--color-neon-green)]"
          />
          <input
            name="company"
            type="text"
            placeholder="Company"
            value={company}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:text-white dark:focus:ring-[var(--color-neon-green)]"
          />
          <input
            name="linkedIn"
            type="url"
            placeholder="LinkedIn URL"
            value={linkedIn}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:text-white dark:focus:ring-[var(--color-neon-green)]"
          />
          <textarea
            name="message"
            placeholder="Short Message"
            required
            rows={3}
            value={message}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:text-white dark:focus:ring-[var(--color-neon-green)]"
          />
          <textarea
            name="fullMessage"
            placeholder="Full Message"
            required
            rows={5}
            value={fullMessage}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:text-white dark:focus:ring-[var(--color-neon-green)]"
          />
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-6 py-2 text-white shadow transition hover:bg-blue-700 dark:bg-[var(--color-neon-green)] dark:text-black dark:hover:brightness-110"
            onClick={() => alert("Form submission logic goes here!")}
          >
            Submit Testimonial
          </button>
        </motion.form>

        {/* Right: Live Preview Card */}

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="h-[300px] min-w-[300px] snap-start [perspective:1000px] sm:min-w-[360px]"
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            className="transform-style-3d relative h-full w-full transition-transform duration-500"
          >
            {/* FRONT */}
            <div className="absolute inset-0 z-20 rounded-xl bg-white p-6 backface-hidden dark:bg-[#1e293b]">
              {/* Flip Icon */}
              <button
                onClick={handleFlip}
                className="dark:hover:text-neon-green absolute top-3 right-3 text-sm text-gray-400 hover:text-blue-500"
              >
                <FaSyncAlt size={16} />
              </button>
              <div className="mb-3 flex items-center gap-4">
                <img
                  src={avatarUrl}
                  alt={name || "Your Name"}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex flex-col items-start">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                    {name || "Your Name"}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {role || "Your Role"},
                    <span className="pl-1 text-gray-400">
                      {" "}
                      @{company || "Your Company"}
                    </span>
                  </p>
                  <a
                    href={linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-gray-400 transition hover:text-blue-500"
                  >
                    <FaLinkedin className="text-lg" />
                  </a>
                </div>
              </div>
              <div className="flex min-h-24 items-center justify-center">
                <p className="relative pl-4 text-gray-700 dark:text-gray-200">
                  <FaQuoteLeft className="dark:text-neon-green absolute top-1 left-0 text-blue-500" />
                  {message || "Your short testimonial message here..."}
                </p>
              </div>
            </div>

            {/* BACK */}
            <div className="absolute inset-0 z-10 rotate-y-180 rounded-xl bg-white p-6 text-center backface-hidden dark:bg-[#1e293b]">
              <button
                onClick={handleFlip}
                className="dark:hover:text-neon-green absolute top-3 right-3 text-sm text-gray-400 hover:text-blue-500"
              >
                ←
              </button>
              <div className="custom-scrollbar mb-4 max-h-48 overflow-y-auto mt-5 whitespace-pre-wrap text-gray-700 dark:text-gray-200">
                {fullMessage ||
                  "Your full detailed testimonial message here..."}
              </div>
              {
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  — {new Date().toLocaleDateString()}
                </p>
              }
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
