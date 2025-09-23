import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./state/slice/authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMe());
    }
  }, [dispatch, isAuthenticated]);

  return <>{children}</>;
};

export default AuthInitializer;