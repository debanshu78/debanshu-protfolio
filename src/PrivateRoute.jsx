// components/PrivateRoute.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useLoginModal } from "./context/LoginModalContext";
import { useRequireAuth } from "./hooks/useRequireAuth";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useRequireAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoginOpen, openLoginModal, closeLoginModal } = useLoginModal();

  useEffect(() => {
    if (!isAuthenticated && !isLoginOpen) {
      openLoginModal();
    }
  }, [isAuthenticated, isLoginOpen, openLoginModal]);

  useEffect(() => {
    console.log("PrivateRoute: isAuthenticated:", isAuthenticated);
    if (!isAuthenticated && !isLoginOpen) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isLoginOpen, navigate]);

  if (!isAuthenticated) {
    return null; // Optionally, render a placeholder or loading indicator
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
