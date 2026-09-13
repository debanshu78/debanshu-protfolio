import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../state/slice/authSlice";
import InputField from "../InputField/InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router";

export const SignInForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Validation state
  const [validation, setValidation] = useState({
    email: { status: "default", message: "" },
    password: { status: "default", message: "" },
  });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getFieldValidation = (field, value) => {
    switch (field) {
      case "email":
        if (!value.trim())
          return { status: "error", message: "Email is required." };
        if (!isValidEmail(value))
          return { status: "error", message: "Invalid email address." };
        return { status: "default", message: "" };
      case "password":
        if (!value)
          return { status: "error", message: "Password is required." };
        return { status: "default", message: "" };
      default:
        return { status: "default", message: "" };
    }
  };

  const validate = () => {
    const result = {
      email: getFieldValidation("email", form.email),
      password: getFieldValidation("password", form.password),
    };
    setValidation(result);
    return Object.values(result).every((v) => v.status !== "error");
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setValidation((prev) => ({
      ...prev,
      [field]: getFieldValidation(field, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await dispatch(loginUser(form));
    if (result.meta.requestStatus === "fulfilled") {
      onSuccess();
      navigate(from, { replace: true });
    }
  };

  useEffect(() => {
    return () => {
      setForm({ email: "", password: "" });
      setShowPassword(false);
      setValidation({
        email: { status: "default", message: "" },
        password: { status: "default", message: "" },
      });
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <InputField
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        helperText={validation.email.message}
        status={validation.email.status}
        required
      />
      <InputField
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
        helperText={validation.password.message}
        status={validation.password.status}
        endAdornment={
          showPassword ? (
            <FaEye
              onClick={() => setShowPassword(false)}
              className="cursor-pointer"
            />
          ) : (
            <FaEyeSlash
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
