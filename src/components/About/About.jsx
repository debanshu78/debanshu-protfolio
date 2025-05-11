import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaLightbulb,
  FaBriefcase,
  FaArrowUp,
} from "react-icons/fa";
import AboutDetailsTab from "./AboutDetailsTab";

const About = () => {
  const timelineRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const timelineItems = [
    {
      year: "2015",
      title: "10th Grade",
      description: "Saraswati Sishu/Vidya Mandir, Baramunda – 87%",
      icon: <FaGraduationCap />,
    },
    {
      year: "2016-2018",
      title: "+2 Science",
      description: "Rajdhani Jr. College – 78%",
      icon: <FaGraduationCap />,
    },
    {
      year: "2018-2022",
      title: "B.Tech in Computer Science",
      description: "Siksha 'O' Anusandhan University – CGPA: 9.34",
      icon: <FaGraduationCap />,
    },
    {
      year: "Sept 2020 – Dec 2020",
      title: "Infosys Summer of Ideas",
      description: "Participated in tech ideation & mentoring program.",
      icon: <FaLightbulb />,
    },
    {
      year: "Feb 2021 – Dec 2021",
      title: "Software Development Intern",
      description: "Interned at Siemens building scalable web solutions.",
      icon: <FaLaptopCode />,
    },
    {
      year: "Jan 2022 – Jan 2023",
      title: "Graduate Software Engineer",
      description: "Worked at Blue Optima on performance analytics tools.",
      icon: <FaBriefcase />,
    },
    {
      year: "Feb 2023 – Present",
      title: "Software Developer",
      description: "Building software systems at Siemens.",
      icon: <FaBriefcase />,
    },
    {
      year: "Future",
      title: "More to come...",
      description: "Future milestones to be added.",
      icon: <FaLightbulb />,
      comingSoon: true,
    },
  ];

  const startAutoScroll = () => {
    const container = timelineRef.current;
    if (!container) return;

    scrollIntervalRef.current = setInterval(() => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        stopAutoScroll();
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
    return stopAutoScroll;
  }, []);

  return (
    <section
      id="about"
      className="bg-[#f9fafb] px-4 py-16 transition-all duration-500 dark:bg-[#0f172a]"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 md:grid-cols-2">
        <AboutDetailsTab />

        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-3xl font-bold text-gray-900 dark:text-white"
          >
            How My Journey So Far?
          </motion.h2>

          <div
            ref={timelineRef}
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
            className="hide-scrollbar max-h-[400px] overflow-y-auto scroll-smooth pr-4"
          >
            <div className="dark:border-neon-green relative ml-4 space-y-10 border-l-4 border-blue-500 pl-6">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  <div className="flex items-start gap-3">
                    <div className="dark:text-neon-green mt-1 text-lg text-blue-600">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                        <span className="dark:text-neon-green font-bold text-blue-600">
                          {item.year}
                        </span>{" "}
                        – {item.title}
                      </h4>
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
                    </div>
                  </div>
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
