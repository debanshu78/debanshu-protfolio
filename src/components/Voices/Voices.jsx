import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaRegEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import VoiceCard from "../VoiceCard";
import WelcomeUser from "../WelcomeUser/WelcomeUser";
import { AuthModal } from "../AuthModal/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestTestimonialsPerUser } from "../../state/slice/testimonialSlice";

const Voices = () => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const { user, status } = useSelector((state) => state.auth);

  const [canScroll, setCanScroll] = useState(false);
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Rename to avoid confusion
  const { testimonials: apiTestimonials, testimonialsStatus, error } = useSelector(
    (state) => state.testimonial,
  );

  // Local state for mapped testimonials
  const [testimonials, setTestimonials] = useState([]);

  // Fetch from API
  useEffect(() => {
    dispatch(fetchLatestTestimonialsPerUser());
  }, [dispatch]);

  // Transform API testimonials to UI structure
  useEffect(() => {
    if (!Array.isArray(apiTestimonials)) return;
    const mapped = apiTestimonials.map((t, idx) => ({
      id: t._id || idx,
      avatar: t.user?.avatarUrl || "https://i.pravatar.cc/150?img=12",
      name: t.user?.name || "Anonymous",
      role: t.user?.currentPosition || "",
      company: t.user?.company || "",
      linkedIn: t.user?.socialLinks?.linkedIn || "",
      message: t.shortMessage || "",
      fullMessage: t.fullMessage || "",
      upvotedSkills: t.upvotedSkills || [],
      date: new Date(t.createdAt).toLocaleString("default", { month: "long", year: "numeric" }),
    }));
    setTestimonials(mapped);
  }, [apiTestimonials]);

  // Check if scrolling is needed
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

  useEffect(() => {
    if (!canScroll || isHovered) return;
    intervalRef.current = setInterval(() => {
      const container = containerRef.current;
      if (container) {
        container.scrollBy({ left: 360, behavior: "smooth" });
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

  const handleAddWordsClick = () => {
    console.log(isAuthenticated, "isAuthenticated");
    if (isAuthenticated) {
      navigate("/testimonial");
    } else {
      openLoginModal();
      navigate("/", { state: { from: { pathname: "/testimonial" } } });
    }
  };

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
        <h2 className="mb-5 text-3xl font-bold text-gray-800 dark:text-gray-100">
          What Others Say?
        </h2>
        <p className="mb-1 text-gray-400 dark:text-gray-300">
          Share a few words about working with me
        </p>

        <WelcomeUser
          beforeSignInText="but before that just"
          user={user}
          onSignInClick={() => setShowAuthModal(true)}
          className="mb-4"
        />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />

        <motion.button
          onClick={handleAddWordsClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="dark:border-neon-green dark:text-neon-green dark:hover:bg-neon-green mb-3 inline-flex items-center gap-2 rounded-xl border border-blue-500 px-4 py-2 text-blue-600 transition-all hover:bg-blue-600 hover:text-white dark:hover:text-black"
        >
          <FaRegEdit className="text-xl" />
          Add a few words
        </motion.button>

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
            className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth p-2"
          >
            {testimonials.map((t) => (
              <VoiceCard
                key={t.id}
                t={t}
                flippedCardId={flippedCardId}
                setFlippedCardId={setFlippedCardId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Voices;
