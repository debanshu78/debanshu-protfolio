import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe, resetError } from "./state/slice/authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
    dispatch(resetError());
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthInitializer;
