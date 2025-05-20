import { FaLinkedin, FaQuoteLeft, FaSyncAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const VoiceCard = ({ t, flippedCardId, setFlippedCardId }) => {
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
                <span className="pl-1 text-gray-400">@{t.company}</span>
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
              &nbsp;&nbsp;&nbsp;
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
};

VoiceCard.propTypes = {
  t: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    linkedIn: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    fullMessage: PropTypes.string.isRequired,
    upvotedSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
    date: PropTypes.string,
  }).isRequired,
  flippedCardId: PropTypes.string,
  setFlippedCardId: PropTypes.func.isRequired,
};

export default VoiceCard;
