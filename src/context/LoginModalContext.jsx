import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const LoginModalContext = createContext();

export const LoginModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLoginModal = () => setIsOpen(true);
  const closeLoginModal = () => setIsOpen(false);

  return (
    <LoginModalContext.Provider
      value={{ isLoginOpen: isOpen, openLoginModal, closeLoginModal }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};

LoginModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error("useLoginModal must be used within a LoginModalProvider");
  }
  return context;
};
