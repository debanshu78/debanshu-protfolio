import { useState } from "react";

export const AuthForm = ({ mode, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "signup") {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      console.log("Sign up with", email, otp, password, confirmPassword);
    } else {
      console.log("Sign in with", email, password);
    }

    onSuccess(); // Close modal on success
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        required
        placeholder="Email"
        className="rounded bg-gray-100 px-4 py-2 text-black dark:bg-[#2a3a5b] dark:text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {mode === "signup" && (
        <input
          type="text"
          required
          placeholder="Enter OTP"
          className="rounded bg-gray-100 px-4 py-2 text-black dark:bg-[#2a3a5b] dark:text-white"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      )}

      <input
        type="password"
        required
        placeholder="Password"
        className="rounded bg-gray-100 px-4 py-2 text-black dark:bg-[#2a3a5b] dark:text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {mode === "signup" && (
        <input
          type="password"
          required
          placeholder="Confirm Password"
          className="rounded bg-gray-100 px-4 py-2 text-black dark:bg-[#2a3a5b] dark:text-white"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}

      <button
        type="submit"
        className="rounded-md bg-blue-600 px-6 py-2 text-white shadow transition hover:bg-blue-700 dark:bg-[var(--color-neon-green)] dark:text-black dark:hover:brightness-110"
      >
        {mode === "signin" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};
