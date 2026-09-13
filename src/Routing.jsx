import { Route, Routes } from "react-router";
import App from "./App";
import TestimonialsForm from "./pages/TestimonialForm/TestimonialsForm";
import AuthInitializer from "./AuthInitializer";
import { useLoginModal } from "./context/LoginModalContext";
import { AuthModal } from "./components/AuthModal/AuthModal";
import PrivateRoute from "./PrivateRoute";
import { useEffect } from "react";
import { fetchCurrentUser } from "./state/slice/userSlice";
import { useDispatch } from "react-redux";

const Routing = () => {
  const dispatch = useDispatch();
  const { isLoginOpen, closeLoginModal } = useLoginModal();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  
  return (
    <AuthInitializer>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/testimonial-post" element={<TestimonialsForm />} exact />
      </Routes>
    </AuthInitializer>
  );
};

export default Routing;
