import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { FaArrowLeft, FaArrowRight, FaArrowUp } from "react-icons/fa6";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import WelcomeUser from "../WelcomeUser/WelcomeUser";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkills,
  upvoteSkill,
  downvoteSkill,
} from "../../state/slice/skillsSlice";

const Skills = () => {
  const dispatch = useDispatch();
  const { skills, status, error } = useSelector((state) => state.skills);
  const { user } = useSelector((state) => state.auth);

  const [activeCategory, setActiveCategory] = useState("All");
  const [showArrows, setShowArrows] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const scrollRef = useRef(null);

  // Memoize categories for performance
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(skills.map((skill) => skill.category))),
    ],
    [skills],
  );

  // Memoize filtered skills
  const filteredSkills = useMemo(
    () =>
      activeCategory === "All"
        ? skills
        : skills.filter((skill) => skill.category === activeCategory),
    [skills, activeCategory],
  );

  // Toggle upvote/downvote handler
  const handleSkillVote = async (skill) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const hasUpvoted = skill.skillUpvotes?.some(
      (upvote) => upvote.userId === user._id
    );
    try {
      if (hasUpvoted) {
        await dispatch(downvoteSkill(skill._id)).unwrap();
      } else {
        await dispatch(upvoteSkill(skill._id)).unwrap();
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {
      // Optionally show error
    }
  };

  // Scroll helpers
  const scrollByAmount = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return 300;
    const card = container.querySelector("div > div");
    return card ? card.offsetWidth * 2.5 : 300;
  }, []);

  const scrollLeft = useCallback(() => {
    scrollRef.current?.scrollBy({
      left: -scrollByAmount(),
      behavior: "smooth",
    });
  }, [scrollByAmount]);

  const scrollRight = useCallback(() => {
    scrollRef.current?.scrollBy({
      left: scrollByAmount(),
      behavior: "smooth",
    });
  }, [scrollByAmount]);

  // Fetch skills on mount
  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  // Check if arrows should be shown
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

  // Show auth modal and upvote
  const handleSkillUpvoteWithAuth = (skill) => {
    // setShowAuthModal(true);
    handleSkillVote(skill);
  };

  return (
    <section
      id="skills"
      className="bg-[#f9fafb] px-4 py-16 transition-all duration-500 dark:bg-[#0f172a]"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-1 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          What I Know?
        </h2>
        <p className="mb-10 text-center text-gray-400 dark:text-gray-300">
          Click on the ⬆️ to upvote my skills
          <WelcomeUser
            beforeSignInText="just a moment and "
            user={user}
            onSignInClick={() => setShowAuthModal(true)}
            className="mb-4"
          />
        </p>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />

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

        {/* Arrows */}
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

        {/* Skills Carousel */}
        <div
          ref={scrollRef}
          className={`hide-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth ${
            !showArrows ? "justify-center" : ""
          }`}
          style={{ minHeight: "16rem" }}
        >
          <div
            className={`grid ${
              filteredSkills.length <= 10
                ? "grid-rows-1 items-start"
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
                    onClick={() => handleSkillVote(skill)}
                    className={`cursor-pointer ${
                      skill.skillUpvotes?.some((upvote) => upvote.userId === user?._id)
                        ? "text-red-600 dark:text-red-400"
                        : "text-blue-600 dark:text-neon-green"
                    }`}
                    title={
                      skill.skillUpvotes?.some((upvote) => upvote.userId === user?._id)
                        ? "Remove upvote"
                        : "Upvote"
                    }
                  >
                    <FaArrowUp size={18} />
                  </button>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                    {skill.skillUpvotes?.length || 0}
                  </span>
                </div>
                {skill.projects.length > 0 ? (
                  <a
                    href={skill.projects[0]}
                    target="_blank"
                    rel="noopener noreferrer"
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
