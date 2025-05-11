import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaArrowUp } from "react-icons/fa6";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

// Dummy skills data
const skillsData = [
  {
    name: "React",
    icon: "⚛️",
    category: "Frontend",
    projects: ["https://github.com/your-react-project"],
  },
  {
    name: "Node.js",
    icon: "🟢",
    category: "Backend",
    projects: ["https://github.com/your-node-project"],
  },
  {
    name: "Docker",
    icon: "🐳",
    category: "Tools",
    projects: ["https://github.com/your-docker-project"],
  },
  {
    name: "PostgreSQL",
    icon: "🐘",
    category: "Backend",
    projects: ["https://github.com/your-db-project"],
  },
  { name: "JavaScript", icon: "📜", category: "Programming", projects: [] },
  { name: "TypeScript", icon: "🔷", category: "Programming", projects: [] },
  { name: "Next.js", icon: "➡️", category: "Frontend", projects: [] },
  { name: "Tailwind CSS", icon: "💨", category: "Frontend", projects: [] },
  { name: "Express.js", icon: "🚂", category: "Backend", projects: [] },
  { name: "Git", icon: "🔧", category: "Tools", projects: [] },
  { name: "GraphQL", icon: "🕸️", category: "Backend", projects: [] },
  { name: "Redux", icon: "🌀", category: "Frontend", projects: [] },

  { name: "JavaScript", icon: "📜", category: "Programming", projects: [] },
  { name: "TypeScript", icon: "🔷", category: "Programming", projects: [] },
  { name: "Next.js", icon: "➡️", category: "Frontend", projects: [] },
  { name: "Tailwind CSS", icon: "💨", category: "Frontend", projects: [] },
  { name: "Express.js", icon: "🚂", category: "Backend", projects: [] },
  { name: "Git", icon: "🔧", category: "Tools", projects: [] },
  { name: "GraphQL", icon: "🕸️", category: "Backend", projects: [] },
  { name: "Redux", icon: "🌀", category: "Frontend", projects: [] },
];

const categories = ["All", "Frontend", "Backend", "Tools", "Programming"];

const Skills = () => {
  const [votes, setVotes] = useState({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [showArrows, setShowArrows] = useState(false);
  const scrollRef = useRef(null);

  const handleUpvote = (skillName) => {
    setVotes((prev) => ({
      ...prev,
      [skillName]: (prev[skillName] || 0) + 1,
    }));

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const scrollByAmount = () => {
    const container = scrollRef.current;
    if (!container) return 300;
    const card = container.querySelector("div > div");
    return card ? card.offsetWidth * 2.5 : 300;
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -scrollByAmount(),
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollByAmount(), behavior: "smooth" });
  };

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  useEffect(() => {
    const checkOverflow = () => {
      const el = scrollRef.current;
      if (!el) return;
      setShowArrows(el.scrollWidth > el.clientWidth + 10);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [filteredSkills]);

  return (
    <section
      id="skills"
      className="bg-[#f9fafb] px-4 py-16 transition-all duration-500 dark:bg-[#0f172a]"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-1 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          What I Know
        </h2>
        <p className="mb-10 text-center text-gray-400 dark:text-gray-300">
          Click on the ⬆️ to upvote my skills
        </p>

        {/* Category Toggles */}
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`rounded-full px-4 py-2 font-medium transition-all ${
                activeCategory === cat
                  ? "dark:bg-neon-green bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-[#1e293b] dark:text-gray-300"
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Arrows (absolute and space reserved always) */}
        <div className="relative mb-6 h-10">
          {showArrows && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-gray-300 p-2 text-gray-800 shadow-md dark:bg-gray-700 dark:text-white"
                aria-label="Scroll Left"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={scrollRight}
                className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-gray-300 p-2 text-gray-800 shadow-md dark:bg-gray-700 dark:text-white"
                aria-label="Scroll Right"
              >
                <FaArrowRight />
              </button>
            </>
          )}
        </div>

        {/* Skills Carousel (2 rows or 1 row if fits) */}
        <div
          ref={scrollRef}
          className={`hide-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth ${
            !showArrows ? "justify-center" : ""
          }`}
          style={{ minHeight: "16rem" }} // maintain consistent height
        >
          <div
            className={`grid ${
              filteredSkills.length <= 10
                ? "grid-rows-1 items-start" // Center items for single row
                : "grid-rows-2"
            } auto-cols-[minmax(150px,_1fr)] grid-flow-col gap-4 p-1.5`}
          >
            {filteredSkills.map((skill, idx) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                key={`${skill.name}-${idx}`}
                className="flex snap-start flex-col items-center justify-between rounded-xl bg-white p-4 text-center shadow-md transition-all dark:bg-[#1e293b]"
              >
                <div className="mb-2 text-4xl">{skill.icon}</div>
                <div className="text-sm font-semibold text-gray-800 dark:text-white">
                  {skill.name}
                </div>

                <div className="mt-2 flex items-center gap-1">
                  <button
                    onClick={() => handleUpvote(skill.name)}
                    className="dark:text-neon-green cursor-pointer text-blue-600"
                  >
                    <FaArrowUp size={18} />
                  </button>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                    {votes[skill.name] || 0}
                  </span>
                </div>

                {skill.projects.length > 0 ? (
                  <a
                    href={skill.projects[0]}
                    target="_blank"
                    className="mt-1 text-xs text-blue-500 hover:underline"
                  >
                    View Project
                  </a>
                ) : (
                  <span className="mt-1 text-xs text-gray-800 dark:text-white">
                    Soon Available
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
