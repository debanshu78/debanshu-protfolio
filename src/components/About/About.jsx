import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const About = () => {
  const timelineRef = useRef(null);

  const timelineItems = [
    {
      year: "2019",
      title: "Started My Journey",
      description: "Began coding and exploring web technologies.",
    },
    {
      year: "2021",
      title: "Internship at WebCorp",
      description: "Worked as a frontend intern building responsive UIs.",
    },
    {
      year: "2022",
      title: "Backend Developer at DevSolutions",
      description: "Designed and maintained RESTful APIs with Node.js.",
    },
    {
      year: "2024",
      title: "Full-Stack Developer @Freelance",
      description: "Delivered end-to-end projects for clients worldwide.",
    },
    {
      year: "2019",
      title: "Started My Journey",
      description: "Began coding and exploring web technologies.",
    },
    {
      year: "2021",
      title: "Internship at WebCorp",
      description: "Worked as a frontend intern building responsive UIs.",
    },
    {
      year: "2022",
      title: "Backend Developer at DevSolutions",
      description: "Designed and maintained RESTful APIs with Node.js.",
    },
    {
      year: "2024",
      title: "Full-Stack Developer @Freelance",
      description: "Delivered end-to-end projects for clients worldwide.",
    },
  ];

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (timelineRef.current) {
  //       timelineRef.current.scrollTop += 2; // Adjust scroll speed
  //     }
  //   }, 50); // Adjust interval time for auto scroll speed

  //   return () => clearInterval(intervalId); // Cleanup the interval on unmount
  // }, []);

  return (
    <section
      id="about"
      className="bg-[#f9fafb] px-4 py-16 transition-all duration-500 dark:bg-[#0f172a]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row">
          {/* Left Column - Intro + Ask Me Anything */}
          <div className="space-y-8 md:w-1/2">
            <h2 className="mb-3 text-2xl font-semibold text-gray-800 dark:text-white">
              Who Am I?
            </h2>
            <div>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                A passionate full-stack developer who thrives on building clean,
                scalable, and meaningful digital experiences. Whether it’s
                frontend polish or backend logic, I enjoy solving problems and
                learning along the way.
              </p>
            </div>

            <div className="border-neon-green rounded-xl border bg-white p-5 shadow-md dark:bg-[#0d1117]">
              <h3 className="text-neon-green mb-2 text-lg font-semibold">
                Ask Me Anything 💬
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Curious about my dev journey? Ask me anything — I’m happy to
                chat!
              </p>
              <a
                href="/contact"
                className="border-neon-green text-neon-green hover:bg-neon-green inline-block rounded-lg border px-4 py-2 transition hover:text-black"
              >
                Let’s Connect
              </a>
            </div>
          </div>

          {/* Right Column - Scrollable Timeline */}
          <div
            ref={timelineRef}
            className="relative max-h-[500px] overflow-hidden pl-6 md:w-1/2"
          >
            {/* Vertical line */}
            <div className="bg-neon-green absolute top-0 left-6 h-full w-1 rounded-full opacity-60"></div>

            {/* Scroll Down Arrow */}
            <div className="text-neon-green absolute bottom-5 left-1/2 -translate-x-1/2 transform">
              <span className="text-xl">↓</span>
            </div>

            <motion.div
              className="space-y-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="mb-3 text-2xl font-semibold text-gray-800 dark:text-white">
                How My Journey Is
              </h2>
              {timelineItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="relative pl-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
                >
                  {/* Dot */}
                  <div className="bg-neon-green absolute top-1.5 -left-[0.65rem] h-4 w-4 rounded-full border-2 border-white dark:border-gray-800"></div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                      {item.year} - {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
