import "./App.css";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import HeaderSection from "./components/Header/HeaderSection";
import Navbar from "./components/Navbar/Navbar";
import Skills from "./components/Skills/Skills";
import Voices from "./components/Voices/Voices";

const App = () => {
  const menuItems = ["Home", "Skills", "Voices", "About", "Contact"];
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#e4e4e7] text-black transition-all duration-500 dark:bg-[#0d1117] dark:bg-gradient-to-br dark:from-[#0b0f19] dark:to-[#111827] dark:text-gray-200">
      <Navbar menuItems={menuItems} isMenuPanel={false} />
      <HeaderSection />
      <Skills />
      <Voices />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
