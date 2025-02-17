import { useState } from "react";
import ThemeToogle from "./components/ThemeToogle";
import { RiCloseLine, RiMenu3Line, RiTwitterXFill } from "react-icons/ri";
import { SiInstagram, SiLinkedin } from "react-icons/si";

const Navbarold = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {" "}
      <div className="flex justify-center p-4 text-black dark:text-white">
        <div className="relative h-20 w-[96vw]">
          {/* Gradient Border Layer */}
          <div className="dark:bg-neon-green absolute inset-x-[-0.5px] inset-y-[0.5px] h-full w-full rounded-2xl bg-blue-600 p-5 opacity-30"></div>

          {/* Actual Navbar Content (Inside the Border) */}
          <div className="relative flex h-20 w-[96vw] items-center justify-between rounded-2xl bg-white text-black shadow-lg transition-all dark:bg-[#141c2f] dark:text-white">
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
              className="font-poppins hidden gap-5 font-medium md:flex"
            >
              <div>About</div>
              <div>Resume</div>
              <div>Contact</div>
            </div>

            <div className="flex">
              <div className="items-center px-4 md:flex">
                <ThemeToogle />
              </div>
              {/* Social Links & Theme Toggle */}
              <div className="hidden items-center gap-5 px-5 md:flex">
                {/* Theme Toggle Button */}

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
              <div
                className="px-5 md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <RiCloseLine size="2rem" />
                ) : (
                  <RiMenu3Line size="2rem" />
                )}
              </div>
            </div>
          </div>
          {/* Mobile Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? 0 : "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`fixed top-0 right-0 z-50 flex h-full w-64 flex-col gap-5 rounded-2xl border-r border-gray-300 bg-white p-5 text-black drop-shadow-xl transition-all md:hidden dark:bg-neutral-900 dark:text-white`}
          >
            <div className="flex justify-end">
              <RiCloseLine size="2rem" onClick={() => setIsOpen(false)} />
            </div>
            <div className="font-poppins flex flex-col gap-5 text-lg font-medium">
              <div>About</div>
              <div>Resume</div>
              <div>Contact</div>
            </div>
            <div className="mt-5 flex gap-5">
              <a
                href="https://www.linkedin.com/in/debanshurout"
                target="_blank"
              >
                <SiLinkedin size="1.5rem" className="text-blue-600" />
              </a>
              <a
                href="https://www.instagram.com/debanshu__rout/"
                target="_blank"
              >
                <SiInstagram size="1.5rem" className="text-pink-500" />
              </a>
              <a href="https://x.com/debanshu78" target="_blank">
                <RiTwitterXFill size="1.5rem" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <div
        id="nav-bar"
        className={`flex justify-center p-4 text-black dark:text-white`}
      >
        <div
          id="large-screen"
          className={`dark:text-gray-100flex flex h-20 w-[96vw] items-center justify-between rounded-2xl bg-white text-black shadow-lg transition-all duration-500 dark:bg-[#0c0c0c] dark:bg-[#141c2f] dark:text-white`}
        ></div>

        {/* Mobile Sidebar */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? 0 : "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`fixed top-0 right-0 z-50 flex h-full w-64 flex-col gap-5 rounded-2xl border-r border-gray-300 bg-white p-5 text-black drop-shadow-xl transition-all md:hidden dark:bg-neutral-900 dark:text-white`}
        >
          <div className="flex justify-end">
            <RiCloseLine size="2rem" onClick={() => setIsOpen(false)} />
          </div>
          <div className="font-poppins flex flex-col gap-5 text-lg font-medium">
            <div>About</div>
            <div>Resume</div>
            <div>Contact</div>
          </div>
          <div className="mt-5 flex gap-5">
            <a href="https://www.linkedin.com/in/debanshurout" target="_blank">
              <SiLinkedin size="1.5rem" className="text-blue-600" />
            </a>
            <a href="https://www.instagram.com/debanshu__rout/" target="_blank">
              <SiInstagram size="1.5rem" className="text-pink-500" />
            </a>
            <a href="https://x.com/debanshu78" target="_blank">
              <RiTwitterXFill size="1.5rem" />
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Navbarold;
