import { Route, Routes } from "react-router";
import App from "./App";

const Routing = () => {
  console.log("hii");
  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  );
};

export default Routing;
