import "./App.css";
import HeaderSection from "./components/Header/HeaderSection";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black transition-all duration-500 dark:bg-[#0d1117] dark:text-gray-200">
      <Navbar />
      <HeaderSection />
    </div>
  );
};

export default App;
