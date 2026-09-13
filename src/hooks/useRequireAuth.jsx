import { useSelector } from "react-redux";
import { useLoginModal } from "../context/LoginModalContext";

export const useRequireAuth = () => {
  const { openLoginModal } = useLoginModal();
  const user = useSelector((state) => state.user.user);

  const checkAuth = (callback) => {
    if (!user) {
      openLoginModal();
      return false;
    }
    callback?.();
    return true;
  };

  return { checkAuth, isAuthenticated: !!user };
};
