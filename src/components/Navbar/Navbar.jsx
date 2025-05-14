import { useState, useEffect } from "react";
import { SiLinkedin, SiInstagram } from "react-icons/si";
import { RiTwitterXFill, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { motion } from "framer-motion";
import ThemeToogle from "../ThemeToogle";
import useActiveSection from "../../hooks/useActiveSection";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [floatingOpen, setFloatingOpen] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const activeSection = useActiveSection();
  const menuItems = ["Home", "Skills", "Voices", "About", "Contact"];

  // Show floating button based on scroll position and footer distance
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const footerElement = document.getElementById("footer");

      // Check if footer exists and get its position
      const footerOffset = footerElement ? footerElement.offsetTop : Infinity;
      const footerHeight = footerElement ? footerElement.offsetHeight : 0;

      // Button will appear after 300px scroll, and hide if the footer is near
      const shouldShowButton =
        scrollY > 300 &&
        scrollY + windowHeight < footerOffset - footerHeight + 700;

      setShowFloating(shouldShowButton);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center p-4 text-black dark:text-white">
      <div className="relative h-20 w-[96vw]">
        {/* Gradient Border Layer */}
        <div className="dark:bg-neon-green absolute inset-x-[-0.5px] inset-y-[0.5px] h-full w-full rounded-2xl bg-blue-600 p-5 opacity-30"></div>

        {/* Actual Navbar Content (Inside the Border) */}
        <div className="relative flex h-20 w-[96vw] items-center justify-between rounded-2xl bg-white text-black shadow-lg transition-all dark:bg-[#151c2e] dark:text-white">
          {/* Logo */}
          <div id="logo" className="pl-6 font-medium">
            <span
              className={`font-firacode dark:text-neon-green pr-1 text-3xl text-blue-600`}
            >{`<`}</span>
            <span className="font-poppins text-2xl">Debanshu</span>
            <span
              className={`dark:text-neon-green px-1 text-2xl text-blue-600`}
            >
              {"/"}
            </span>
            <span
              className={`font-firacode dark:text-neon-green pr-1 text-3xl text-blue-600`}
            >
              {">"}
            </span>
          </div>

          {/* Menu for desktop */}
          <div
            id="menu"
            className="font-poppins mx-6 hidden gap-5 font-medium md:flex"
          >
            {menuItems.map((item) => (
              <div key={item} className="group relative cursor-pointer">
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`${activeSection === item.toLowerCase() ? "dark:text-neon-green text-blue-600" : ""}`}
                >
                  {item}
                </a>
                <span
                  className={`dark:bg-neon-green absolute bottom-[-2px] left-0 h-[2px] bg-blue-600 transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </div>
            ))}
          </div>

          <div className="flex">
            <div className="items-center px-4 md:flex">
              <ThemeToogle />
            </div>
            {/* Social Links & Theme Toggle */}
            <div className="hidden items-center gap-5 px-5 md:flex">
              <a
                href="https://www.linkedin.com/in/debanshurout"
                target="_blank"
              >
                <SiLinkedin size="1.5rem" />
              </a>
              <a
                href="https://www.instagram.com/debanshu__rout/"
                target="_blank"
              >
                <SiInstagram size="1.5rem" />
              </a>
              <a href="https://x.com/debanshu78" target="_blank">
                <RiTwitterXFill size="1.5rem" />
              </a>
            </div>
            {/* Mobile Menu Button */}
            <div className="px-5 md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <RiCloseLine size="2rem" />
              ) : (
                <RiMenu3Line size="2rem" />
              )}
            </div>
          </div>
        </div>

        {/* Floating Menu */}
        {showFloating && (
          <div className="fixed right-5 bottom-10 z-40">
            {/* Open Button */}
            {!floatingOpen && (
              <button
                onClick={() => setFloatingOpen(true)}
                className="dark:text-neon-green p-1 text-2xl text-blue-600 opacity-30 transition hover:opacity-100 focus:outline-none"
                aria-label="Open menu"
              >
                &#9776; {/* Hamburger icon */}
              </button>
            )}

            {/* Floating Menu */}
            {floatingOpen && (
              <div className="mt-3 flex flex-col items-end gap-2">
                {/* Close Button */}
                <button
                  onClick={() => setFloatingOpen(false)}
                  className="dark:text-neon-green p-1 text-xl text-blue-600 opacity-30 transition hover:opacity-100 focus:outline-none"
                  aria-label="Close menu"
                >
                  &times; {/* X icon */}
                </button>

                {/* Menu Items */}
                {menuItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setFloatingOpen(false)}
                    className="dark:hover:text-neon-green rounded-md px-3 py-1 text-sm font-semibold text-black/80 backdrop-blur-sm transition hover:text-blue-600 dark:text-white/90"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
