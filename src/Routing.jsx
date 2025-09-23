import { Route, Routes } from "react-router";
import App from "./App";
import TestimonialsForm from "./pages/TestimonialForm/TestimonialsForm";
import AuthInitializer from "./AuthInitializer";

const Routing = () => {
  console.log("hii");
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
