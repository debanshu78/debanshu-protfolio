import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaMusic, FaMountain, FaGamepad } from "react-icons/fa";

const AboutDetailsTab = () => {
  const [activeTab, setActiveTab] = useState("professional");

  const tabs = [
    { id: "professional", label: "Professional" },
    { id: "personal", label: "Personal" },
  ];

  const tabContent = {
    professional: (
      <>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          As a full-stack enthusiast, I love writing clean code and exploring
          the magic behind interactive, scalable web applications. I genuinely
          enjoy the process — from structuring sleek interfaces to understanding
          how data flows through systems.
        </p>
        <div className="dark:text-neon-green flex items-center space-x-2 text-blue-500">
          <p className="text-sm italic">
            "The best way to learn is to build, break 🔨, and build again 🔁"
          </p>
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          Bugs? Yes, they’re stressful. Fixing them? Pure joy. That “it works!”
          moment is what keeps me motivated and hungry to keep learning.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          I’m always excited to dive into new technologies, tools, and
          frameworks — not just to stay current, but because I truly enjoy the
          learning curve. For me, every new concept is an opportunity to grow
          and think differently.
        </p>
      </>
    ),
    personal: (
      <>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          Beyond the screen, I’m someone who believes in hard work, consistency,
          and a deep spiritual connection with Lord Jagannath. Spirituality
          grounds me, and I carry that calm strength into everything I do.
        </p>
        <div className="dark:text-neon-green flex items-center space-x-2 text-blue-500">
          <p className="text-sm italic">
            “Where words fail, music speaks 🎶.” – Hans Christian Andersen
          </p>
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          Music is my constant companion. I don’t just listen — I dive deep into
          every tune, every instrument, feeling the soul of the composition.
          It’s more than entertainment — it’s a form of meditation.
        </p>
        <div className="dark:text-neon-green flex items-center space-x-2 text-blue-500">
          <p className="text-sm italic">
            “The mountains are calling, and I must go.” – John Muir
          </p>
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          Travel is my way of reconnecting with the world and with myself. From
          the gentle hum of ocean waves to the quiet majesty of the mountains, I
          find healing and inspiration in nature. Rain, especially, feels like a
          magical brush that paints beauty onto everything it touches.
        </p>
        <div className="dark:text-neon-green flex items-center space-x-2 text-blue-500">
          <p className="text-sm italic">
            “Life is like a game — sometimes you win, sometimes you learn.”
          </p>
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          And yes, recently I’ve bravely taken up badminton. My smashes? Not
          quite Olympic-ready. But I run after the shuttle like my career
          depends on it. It’s chaos, cardio, and comedy — all in one.
        </p>
      </>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
        Who Am I?
      </h2>

      {/* Tab Controls */}
      <div className="mb-6 flex space-x-4 border-b border-gray-300 dark:border-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 text-lg font-medium transition-colors ${
              activeTab === tab.id
                ? "dark:text-neon-green dark:border-neon-green border-b-2 border-blue-500 text-blue-500"
                : "dark:hover:text-neon-green text-gray-500 hover:text-blue-500 dark:text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="custom-scrollbar max-h-[340px] space-y-4 overflow-y-auto pr-3 text-justify"
        >
          {tabContent[activeTab]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default AboutDetailsTab;
