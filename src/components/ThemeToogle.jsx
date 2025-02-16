import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuSun } from "react-icons/lu";
import { GiOwl } from "react-icons/gi";

const ThemeToogle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.toggle(
        "dark",
        localStorage.theme === "dark" ||
          (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches),
      );
    }
  }, []);

  const toggleThemeAcc = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        localStorage.theme = "light";
      }
      return newMode;
    });
  };

  return (
    <motion.div
      onClick={toggleThemeAcc}
      whileTap={{ scale: 0.9 }}
      className="cursor-pointer"
    >
      {darkMode ? (
        <motion.div
          animate={{ y: [-10, 0], opacity: [0, 1] }}
          transition={{ duration: 0.7 }}
        >
          <GiOwl size="2.2rem" className="text-yellow-500" />
        </motion.div>
      ) : (
        <motion.div
          animate={{ scale: [0.8, 1.2, 1], rotate: [0, 360] }}
          transition={{ duration: 0.7 }}
        >
          <LuSun size="2.2rem" className="text-yellow-500" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ThemeToogle;
