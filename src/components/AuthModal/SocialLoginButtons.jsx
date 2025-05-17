import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";

export const SocialLoginButtons = () => {
  const handleSocialLogin = (provider) => {
    console.log("Log in with", provider); // Replace with real logic
  };

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={() => handleSocialLogin("google")}
        className="rounded-full bg-white p-2 dark:bg-[#2a3a5b]"
      >
        <FaGoogle size={20} />
      </button>
      <button
        onClick={() => handleSocialLogin("github")}
        className="rounded-full bg-white p-2 dark:bg-[#2a3a5b]"
      >
        <FaGithub size={20} />
      </button>
      <button
        onClick={() => handleSocialLogin("linkedin")}
        className="rounded-full bg-white p-2 dark:bg-[#2a3a5b]"
      >
        <FaLinkedin size={20} />
      </button>
    </div>
  );
};
