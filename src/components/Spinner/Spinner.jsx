import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Spinner = ({ className = "", size = 24 }) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 0.8,
      }}
      style={{ width: size, height: size }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-20"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
        />
        <path
          d="M45 25c0-11.046-8.954-20-20-20"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          className="origin-center"
        />
      </svg>
    </motion.div>
  );
};

Spinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

export default Spinner;
