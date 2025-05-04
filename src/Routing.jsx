import { Route, Routes } from "react-router";
import App from "./App";
import TestimonialsForm from "./pages/TestimonialForm/TestimonialsForm";

const Routing = () => {
  console.log("hii");
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/testimonials-post" element={<TestimonialsForm />} exact />
    </Routes>
  );
};

export default Routing;
