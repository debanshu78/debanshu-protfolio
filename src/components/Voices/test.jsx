import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import testimonials from "./testimonial.json"; // or use inline for now

const VoiceSection = () => {
  const [flippedId, setFlippedId] = useState(null);

  const isFlipped = (id) => flippedId === id;

  return (
    <section
      className="font-poppins relative min-h-[80vh] bg-gradient-to-br from-[#0b0f19] to-[#111827] px-6 py-16 text-center text-gray-800 dark:text-white"
      id="voices"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-3xl font-bold">What Others Say</h2>
        <p className="mb-8 text-gray-400 dark:text-gray-300">
          Share a few words about working with me
        </p>
        <button className="mb-12 rounded-full border-2 border-[#00FF00] px-6 py-2 font-medium text-[#00FF00] transition duration-300 hover:bg-[#00FF00] hover:text-white">
          Add a few words
        </button>

        {/* Carousel */}
        <div
          className={`scrollbar-hide justify-${testimonials.length < 3 ? "center" : "start"} relative flex items-center gap-6 overflow-x-auto pb-4 transition-all duration-300`}
        >
          {testimonials.map((item) => {
            const extraSkills = item.upvotedSkills.length - 3; // Adjusting to show only 3 skills with +x more
            return (
              <motion.div
                key={item.id}
                className="relative max-w-[320px] min-w-[280px] flex-shrink-0 rounded-xl bg-[#ffffff0d] p-4 text-left shadow-lg backdrop-blur-md transition-transform duration-500 dark:bg-[#1e293b]"
                animate={{ rotateY: isFlipped(item.id) ? 180 : 0 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Side */}
                {!isFlipped(item.id) && (
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-sm text-gray-300">
                          {item.role}{" "}
                          <span className="text-gray-400">@{item.company}</span>
                        </p>
                      </div>
                      <a
                        href={item.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-gray-300"
                      >
                        <FaLinkedin size={20} />
                      </a>
                    </div>

                    <div className="my-4 text-white">
                      <FaQuoteLeft className="mb-2 text-xl text-gray-400" />
                      <p className="text-sm leading-relaxed">{item.message}</p>
                    </div>

                    {/* Skills at bottom */}
                    <div className="mt-auto flex flex-wrap justify-start gap-1 text-xs text-white">
                      {item.upvotedSkills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border-2 border-[#00FF00] bg-transparent px-2 py-1 text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {extraSkills > 0 && (
                        <span className="text-gray-300">
                          +{extraSkills} more
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setFlippedId(item.id)}
                      className="absolute right-3 bottom-3 text-xs text-[#00FF00] hover:text-white"
                    >
                      Load More
                    </button>
                  </div>
                )}

                {/* Back Side */}
                {isFlipped(item.id) && (
                  <motion.div
                    className="absolute inset-0 flex h-full flex-col justify-between overflow-y-auto rounded-xl bg-[#ffffff0d] p-4 text-white backdrop-blur-md dark:bg-[#1e293b]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-300">{item.date || ""}</p>
                      <button onClick={() => setFlippedId(null)}>
                        <IoIosArrowBack
                          size={20}
                          className="text-white hover:text-[#00FF00]"
                        />
                      </button>
                    </div>
                    <div className="my-4 text-sm leading-relaxed">
                      {item.fullMessage}
                    </div>
                    <div className="mt-auto flex flex-wrap justify-start gap-1 text-xs">
                      {item.upvotedSkills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border-2 border-[#00FF00] bg-transparent px-2 py-1 text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {extraSkills > 0 && (
                        <span className="text-gray-300">
                          +{extraSkills} more
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VoiceSection;
