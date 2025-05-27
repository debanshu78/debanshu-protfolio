import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../state/slice/authSlice";
import InputField from "../InputField/InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";

export const SignInForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", );
    const result = await dispatch(loginUser(form));
    if (result.meta.requestStatus === "fulfilled") {
      onSuccess();
    }
  };

  useEffect(() => {
    return () => {
      setForm({ email: "", password: "" });
      setShowPassword(false);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <InputField
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        required
      />
      <InputField
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
        endAdornment={
          showPassword ? (
            <FaEyeSlash
              onClick={() => setShowPassword(false)}
              className="cursor-pointer"
            />
          ) : (
            <FaEye
              onClick={() => setShowPassword(true)}
              className="cursor-pointer"
            />
          )
        }
        required
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className="rounded-md bg-blue-600 px-6 py-2 text-white shadow transition dark:bg-[var(--color-neon-green)] dark:text-black dark:hover:brightness-110"
      >
        Sign In
      </button>
    </form>
  );
};

SignInForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
