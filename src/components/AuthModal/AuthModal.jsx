import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
// import { AuthForm } from "./AuthForm";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

export const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("signin"); // 'signin' or 'signup'

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex min-h-screen items-center justify-center bg-black/50 px-2 sm:px-4">
        <Dialog.Panel className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-[#1b2a49]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            <IoClose size={22} />
          </button>

          {/* Animated Form Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <Dialog.Title className="mb-4 text-center text-xl font-bold text-gray-800 dark:text-gray-100">
                {mode === "signin" ? (
                  <>
                    Let’s Get You In!
                    <span className="dark:text-neon-green text-blue-500">
                      🔑
                    </span>
                  </>
                ) : (
                  <>
                    Create
                    <span className="dark:text-neon-green text-blue-500">
                      💻
                    </span>
                    . Connect
                    <span className="dark:text-neon-green text-blue-500">
                      ✨
                    </span>
                    . Conquer.
                    <span className="dark:text-neon-green text-blue-500">
                      💥
                    </span>
                  </>
                )}
              </Dialog.Title>
              {mode === "signin" ? (
                <SignInForm
                  onSuccess={() => {
                    onClose();
                  }}
                />
              ) : (
                <SignUpForm
                  onSuccess={() => {
                    setMode("signin");
                  }}
                />
              )}
              <div className="my-4 text-center text-sm text-gray-500 dark:text-gray-300">
                or continue with
              </div>
              <SocialLoginButtons />
              <div className="mt-4 text-center text-sm text-gray-800 dark:text-gray-100">
                {mode === "signin" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      className="dark:text-neon-green font-semibold text-blue-500"
                      onClick={() => setMode("signup")}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      className="dark:text-neon-green font-semibold text-blue-500"
                      onClick={() => setMode("signin")}
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
