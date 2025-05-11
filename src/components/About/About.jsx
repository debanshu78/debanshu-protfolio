import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaCode, FaBriefcase, FaArrowUp } from "react-icons/fa";
import AboutDetailsTab from "./AboutDetailsTab";

const About = () => {
  const timelineRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const timelineItems = [
    {
      year: "2019",
      title: "Started My Journey",
      description: "Began coding and exploring web technologies.",
      icon: <FaCode />,
    },
    {
      year: "2021",
      title: "Internship at WebCorp",
      description: "Built responsive UIs as a frontend intern.",
      icon: <FaBriefcase />,
    },
    {
      year: "2022",
      title: "Backend Dev at DevSolutions",
      description: "Created scalable APIs using Node.js.",
      icon: <FaCode />,
    },
    {
      year: "2024",
      title: "Full-Stack Freelance",
      description: "Delivered client projects end-to-end.",
      icon: <FaBriefcase />,
    },
    {
      year: "2021",
      title: "Internship at WebCorp",
      description: "Built responsive UIs as a frontend intern.",
      icon: <FaBriefcase />,
    },
    {
      year: "2022",
      title: "Backend Dev at DevSolutions",
      description: "Created scalable APIs using Node.js.",
      icon: <FaCode />,
    },
    {
      year: "2024",
      title: "Full-Stack Freelance",
      description: "Delivered client projects end-to-end.",
      icon: <FaBriefcase />,
    },
    {
      year: "2025",
      title: "More to come...",
      description: "Future milestones to be added.",
      icon: <FaCode />,
      comingSoon: true,
    },
  ];

  // Auto-scroll logic
  const startAutoScroll = () => {
    const container = timelineRef.current;
    if (!container) return;

    scrollIntervalRef.current = setInterval(() => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      // At bottom
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        stopAutoScroll();
        // Pause before reset
      } else {
        container.scrollTop += 2;
      }
    }, 30);
  };

  const scrollToTop = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const stopAutoScroll = () => {
    clearInterval(scrollIntervalRef.current);
  };

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll; // Cleanup
  }, []);

  return (
    <section
      id="about"
      className="bg-[#f9fafb] px-4 py-16 transition-all duration-500 dark:bg-[#0f172a]"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 md:grid-cols-2">
        {/* LEFT: Who Am I */}
        <AboutDetailsTab />

        {/* RIGHT: Timeline */}
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-3xl font-bold text-gray-900 dark:text-white"
          >
            How My Journey So Far
          </motion.h2>

          <div
            ref={timelineRef}
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
            className="hide-scrollbar max-h-[400px] overflow-y-auto scroll-smooth pr-4"
          >
            <div className="dark:border-neon-green relative ml-4 space-y-10 border-l-3 border-blue-500 pl-6">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="flex items-center space-x-3">
                    {item.icon && (
                      <div className="text-xl text-gray-800 dark:text-white">
                        {item.icon}
                      </div>
                    )}
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {item.year} – {item.title}
                    </h4>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                  {item.comingSoon && (
                    <>
                      <p className="text-xs text-gray-400 italic dark:text-gray-500">
                        More to come...
                      </p>
                      <button
                        onClick={scrollToTop}
                        aria-label="Scroll to Top"
                        className="dark:hover:text-neon-green mt-6 flex flex-row items-center gap-4 text-gray-600 transition hover:text-blue-600 dark:text-gray-300"
                      >
                        Back to Top <FaArrowUp className="text-base" />
                      </button>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
