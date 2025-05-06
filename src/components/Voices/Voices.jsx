import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaLinkedin,
  FaQuoteLeft,
  FaRegEdit,
  FaSyncAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import testimonials from "./testimonial.json";

const Voices = () => {
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const [canScroll, setCanScroll] = useState(false);
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const checkScroll = () => {
      if (!container) return;
      const scrollable = container.scrollWidth > container.clientWidth;
      setCanScroll(scrollable);
    };
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (!canScroll || isHovered) return;
    intervalRef.current = setInterval(() => {
      const container = containerRef.current;
      if (container) {
        container.scrollBy({ left: 360, behavior: "smooth" });
        // Loop back when near end
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 10
        ) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [canScroll, isHovered]);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const offset = direction === "left" ? -360 : 360;
    container.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section
      className="font-poppins relative min-h-[80vh] bg-gradient-to-br from-[#f5f5f5] to-[#e4e4e7] px-6 py-16 text-center text-gray-800 transition-all duration-500 dark:bg-[#0d1117] dark:bg-gradient-to-br dark:from-[#0b0f19] dark:to-[#111827] dark:text-white"
      id="voices"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          What Others say
        </h2>

        <p className="mb-1 text-gray-400 dark:text-gray-300">
          Share a few words about working with me
        </p>
        <motion.a
          href="/testimonial-form"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="dark:border-neon-green dark:text-neon-green dark:hover:bg-neon-green mb-3 inline-flex items-center gap-2 rounded-xl border border-blue-500 px-4 py-2 text-blue-600 transition-all hover:bg-blue-600 hover:text-white dark:hover:text-black"
        >
          <FaRegEdit className="text-xl" />
          Add a few words
        </motion.a>

        {/* Testimonial Carousel */}
        <div className="relative mt-6">
          {canScroll && (
            <>
              <button
                onClick={() => scroll("left")}
                className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <FaArrowLeft className="text-gray-800 dark:text-white" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <FaArrowRight className="text-gray-800 dark:text-white" />
              </button>
            </>
          )}
          <div
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="hide-scrollbar scroll-smoothtransition-all flex snap-x snap-mandatory gap-4 overflow-x-auto p-2 duration-500 hover:[animation-play-state:paused]"
          >
            {testimonials.map((t) => {
              const extraSkills = t.upvotedSkills.length - 3;
              return (
                <motion.div
                  key={t.id}
                  whileHover={{ scale: 1.03 }}
                  className="h-[300px] min-w-[300px] snap-start [perspective:1000px] sm:min-w-[360px]"
                >
                  <motion.div
                    animate={{ rotateY: flippedCardId === t.id ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="transform-style-3d relative h-full w-full transition-transform duration-500"
                  >
                    {/* FRONT */}
                    <div className="absolute inset-0 z-20 rounded-xl bg-white p-6 backface-hidden dark:bg-[#1e293b]">
                      {/* Flip Icon */}
                      <button
                        onClick={() => setFlippedCardId(t.id)}
                        className="dark:hover:text-neon-green absolute top-3 right-3 text-sm text-gray-400 hover:text-blue-500"
                      >
                        <FaSyncAlt size={16} />
                      </button>
                      <div className="mb-3 flex items-center gap-4">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="flex flex-col items-start">
                          <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                            {t.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {t.role},
                            <span className="pl-1 text-gray-400">
                              @{t.company}
                            </span>
                          </p>
                          <a
                            href={t.linkedIn}
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
                          {t.message}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-1">
                        {t.upvotedSkills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-white"
                          >
                            {skill}
                          </span>
                        ))}
                        {extraSkills > 0 && (
                          <span className="pl-2 text-xs text-gray-300">
                            +{extraSkills} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* BACK */}
                    <div className="absolute inset-0 z-10 rotate-y-180 overflow-y-auto rounded-xl bg-white p-6 backface-hidden dark:bg-[#1e293b]">
                      {" "}
                      <button
                        onClick={() => setFlippedCardId(null)}
                        className="dark:hover:text-neon-green absolute top-3 right-3 text-sm text-gray-400 hover:text-blue-500"
                      >
                        ←
                      </button>
                      <p className="mb-4 whitespace-pre-wrap text-gray-700 dark:text-gray-200">
                        {t.fullMessage}
                      </p>
                      {t.date && (
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                          — {t.date}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Voices;
