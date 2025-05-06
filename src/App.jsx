import "./App.css";
import Contact from "./components/Contact/Contact";
import HeaderSection from "./components/Header/HeaderSection";
import HeaderSectionD from "./components/Header/HeaderSectionDeveloper";
import Navbar from "./components/Navbar/Navbar";
import Skills from "./components/Skills/Skills";
import Voices from "./components/Voices/Voices";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#e4e4e7] text-black transition-all duration-500 dark:bg-[#0d1117] dark:bg-gradient-to-br dark:from-[#0b0f19] dark:to-[#111827] dark:text-gray-200">
      <Navbar />
      <HeaderSection />
      {/* <HeaderSectionD /> */}
      <Skills />
      <Voices />
      {/* <Contact />  */}
    </div>
  );
};

export default App;

// "min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#e4e4e7] text-black transition-all duration-500 dark:bg-[#0d1117] dark:bg-gradient-to-br dark:from-[#0b0f19] dark:to-[#111827] dark:text-gray-200";

// What I Know

// What People Say

// Who I Am

// Say Hi
