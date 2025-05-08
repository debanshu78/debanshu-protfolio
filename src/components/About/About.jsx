import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaCode, FaBriefcase } from "react-icons/fa"; // Icons for the timeline items
import AboutDetailsTab from "./AboutDetailsTab";

const About = () => {
  const timelineRef = useRef(null);

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
  ];

  // ✅ Smooth auto-scroll
  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    let scrollSpeed = 0.5;
    let scrolling = true;

    const scroll = () => {
      if (scrolling) {
        container.scrollTop += scrollSpeed;
        if (
          container.scrollTop + container.clientHeight >=
          container.scrollHeight
        ) {
          container.scrollTop = 0; // loop scroll
        }
      }
      requestAnimationFrame(scroll);
    };

    container.addEventListener("mouseenter", () => (scrolling = false));
    container.addEventListener("mouseleave", () => (scrolling = true));

    requestAnimationFrame(scroll);

    return () => {
      container.removeEventListener("mouseenter", () => (scrolling = false));
      container.removeEventListener("mouseleave", () => (scrolling = true));
    };
  }, []);

  return (
    <section
      id="about"
      className="bg-gradient-to-br from-[#f9fafb] to-white px-6 py-18 dark:from-[#0b0f19] dark:to-[#111827]"
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
                  {/* Dot aligned with the line */}
                  <div className="dark:bg-neon-green absolute top-1.5 -left-[1.05rem] h-4 w-4 rounded-full border-4 border-white bg-blue-500 dark:border-[#0b0f19]"></div>

                  {/* Timeline Item with Icon */}
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
