import { useEffect, useRef, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import testimonials from "./testimonial.json";

const Voices = () => {
  const containerRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);

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

  return (
    <section
      className="font-poppins relative min-h-[80vh] bg-gradient-to-br from-[#0b0f19] to-[#111827] px-6 py-16 text-center text-gray-800 dark:text-white"
      id="voices"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          What Others say
        </h2>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div
            ref={containerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto p-2 transition-all duration-500 hover:[animation-play-state:paused]"
            style={{ scrollBehavior: "smooth" }}
          >
            {testimonials.map((t) => {
              const extraSkills = t.upvotedSkills.length - 3;
              return (
                <motion.div
                  key={t.id}
                  whileHover={{ scale: 1.03 }}
                  className="min-w-[300px] snap-start rounded-xl bg-white p-6 shadow-md sm:min-w-[360px] dark:bg-[#1e293b]"
                >
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
                        <span className="text-gray-400 pl-1">@{t.company}</span>
                      </p>
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
