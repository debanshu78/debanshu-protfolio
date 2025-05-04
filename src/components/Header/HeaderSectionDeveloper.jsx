import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaTerminal } from "react-icons/fa";

const code = `// Developer Mode: Enabled

const debanshu = {
  name: "Debanshu Rout",
  role: "Full Stack Web Developer",
  passion: "Building scalable & efficient applications.",
  sayHi: () => "👋 Hello World!",
  testimonials: () => "💻 Worked with me? Leave a note below!",
  intro: () => {
    console.log("👨🏻‍💻 I am Debanshu Rout, a Full Stack Web Developer.");
    console.log("💡 Passionate about building scalable & efficient applications.");
    console.log("✈️ Love traveling and discovering new places.");
    console.log("🛠️ Exploring new technologies and tools.");
    console.log("🌐 Creating immersive web experiences.");
    console.log("📚 Lifelong learner & creative problem solver.");
  }
};

console.log(debanshu.sayHi());
debanshu.intro();
console.log(debanshu.testimonials());
`;

const HeaderSection = () => {
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Dynamically choose syntax highlighting style based on darkMode state
  const syntaxStyle = darkMode ? dracula : tomorrow;

  const runCode = () => {
    const logs = [
      "👋 Hello World!",
      "👨🏻‍💻 I am Debanshu Rout, a Full Stack Web Developer.",
      "💡 Passionate about building scalable & efficient applications.",
      "✈️ Love traveling and discovering new places.",
      "🛠️ Exploring new technologies and tools.",
      "🌐 Creating immersive web experiences.",
      "📚 Lifelong learner & creative problem solver.",
      "💻 Worked with me? Leave a note below!",
    ];

    setConsoleOutput([]);
    setIsTyping(true);

    logs.forEach((line, index) => {
      setTimeout(() => {
        setConsoleOutput((prev) => [...prev, line]);
        console.log(line);
        if (index === logs.length - 1) setIsTyping(false);
      }, index * 500);
    });
  };

  return (
    <section className="w-full px-4 py-8 font-mono">
      <div className="grid min-h-[500px] w-full grid-cols-1 gap-4 md:grid-cols-2">
        {/* Code Panel */}
        <div className="flex h-full w-full flex-col rounded-xl bg-gray-100/90 p-4 shadow-lg dark:bg-[#0d1117]/80 dark:shadow-[0px_0px_8px_rgba(0,255,150,0.2)]">
          <SyntaxHighlighter
            language="javascript"
            style={syntaxStyle} // Dynamically set the style based on darkMode state
            wrapLongLines
            customStyle={{
              borderRadius: "0.75rem",
              fontSize: "1rem", // Optimized font size
              background: "transparent",
              padding: "1rem", // Adds spacing around the code
              flex: 1,
              minHeight: "calc(50vh - 100px)", // Set to keep area balanced
              whiteSpace: "pre-wrap", // Allow text to wrap
              wordBreak: "break-word", // Break long words onto new lines
            }}
            showLineNumbers={false}
          >
            {code}
          </SyntaxHighlighter>

          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-bold text-green-500">{">"}</span>
            <button
              onClick={runCode}
              disabled={isTyping}
              className="hover:text-neon-green font-mono transition disabled:opacity-40"
            >
              Run Intro
            </button>
            <span className="text-sm text-gray-500">
              // executes debanshu.sayHi(), intro(), testimonials()
            </span>
          </div>
        </div>

        {/* Console Panel */}
        <div className="flex h-full w-full flex-col overflow-y-auto rounded-xl border border-gray-700 bg-black p-4 text-green-400 shadow-inner">
          <div className="mb-2 flex items-center gap-2 text-sm text-white">
            <FaTerminal />
            <span>Console Output</span>
          </div>
          <hr className="mb-2 border-gray-600" />
          {consoleOutput.length === 0 ? (
            <p className="text-gray-500">Run the code to see output...</p>
          ) : (
            consoleOutput.map((line, index) => (
              <p key={index}>
                {">"} {line}
              </p>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
