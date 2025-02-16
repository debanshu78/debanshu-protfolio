import React, { useState } from "react";
import { SiLinkedin, SiInstagram } from "react-icons/si";
import { RiTwitterXFill, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="nav-bar" className="m-4 flex justify-center">
      <div
        id="large-screen"
        className="flex h-15 w-[96vw] items-center justify-between rounded-2xl bg-neutral-950 text-white md:h-20"
      >
        {/* Logo */}
        <div id="logo" className="pl-6 font-medium">
          <span className="font-firacode text-neon-green pr-1 text-3xl">{`<`}</span>
          <span className="font-poppins text-2xl">Debanshu</span>
          <span className="text-neon-green px-1 text-2xl">{"/"}</span>
          <span className="font-firacode text-neon-green pr-1 text-3xl">
            {">"}
          </span>
        </div>

        {/* Menu for desktop */}
        <div id="menu" className="font-poppins hidden gap-5 md:flex">
          <div>About</div>
          <div>Resume</div>
          <div>Contact</div>
        </div>

        {/* Social Links for desktop */}
        <div id="social" className="hidden gap-5 px-5 md:flex">
          <a href="https://www.linkedin.com/in/debanshurout" target="_blank">
            <SiLinkedin size="1.3rem" />
          </a>
          <a href="https://www.instagram.com/debanshu__rout/" target="_blank">
            <SiInstagram size="1.3rem" />
          </a>
          <a href="https://x.com/debanshu78" target="_blank">
            <RiTwitterXFill size="1.3rem" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="px-5 md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <RiCloseLine size="2rem" /> : <RiMenu3Line size="2rem" />}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`fixed top-0 right-0 z-50 flex h-full w-64 flex-col gap-5 rounded-l-2xl border-l border-gray-300 bg-white p-5 text-black shadow-lg md:hidden`}
      >
        <div className="flex justify-end">
          <RiCloseLine
            size="2rem"
            onClick={() => setIsOpen(false)}
            className="text-black"
          />
        </div>
        <div className="font-poppins flex flex-col gap-5 text-lg">
          <div>About</div>
          <div>Resume</div>
          <div>Contact</div>
        </div>
        <div className="mt-5 flex items-center justify-center gap-5">
          <a href="https://www.linkedin.com/in/debanshurout" target="_blank">
            <SiLinkedin size="1.5rem" className="text-blue-600" />
          </a>
          <a href="https://www.instagram.com/debanshu__rout/" target="_blank">
            <SiInstagram size="1.5rem" className="text-pink-500" />
          </a>
          <a href="https://x.com/debanshu78" target="_blank">
            <RiTwitterXFill size="1.5rem" className="text-black" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
