import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOtp,
  verifyOtp,
  registerUser,
  resetAuthStatus,
  resetError,
} from "../../state/slice/authSlice";
import InputField from "../InputField/InputField";
import {
  FaEye,
  FaEyeSlash,
  FaPaperPlane,
  FaRegCheckCircle,
} from "react-icons/fa";
import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";

export const SignUpForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { otpSent, otpVerified, status, error } = useSelector(
    (state) => state.auth,
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState({
    name: { status: "default", message: "" },
    email: { status: "default", message: "" },
    password: { status: "default", message: "" },
    confirmPassword: { status: "default", message: "" },
    otp: { status: "default", message: "" },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const [resendTimer, setResendTimer] = useState(0);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    return () => {
      setForm({
        name: "",
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
      });
      setShowPassword(false);
      setShowConfirmPassword(false);
      setOtpLoading(false);
      setVerifyLoading(false);
      setSignupLoading(false);
      dispatch(resetAuthStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (!error) return;
    setSubmitError(error);
    dispatch(resetError());
  }, [error, dispatch]);

  // Helper function for email validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getFieldValidation = (field, value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;
    switch (field) {
      case "name":
        if (!value.trim())
          return { status: "error", message: "Name is required." };
        return { status: "default", message: "" };
      case "email":
        if (!value.trim())
          return { status: "error", message: "Email is required." };
        if (!isValidEmail(value))
          return { status: "error", message: "Invalid email address." };
        return { status: "default", message: "" };
      case "password":
        if (!value)
          return { status: "error", message: "Password is required." };
        if (!passwordRegex.test(value))
          return {
            status: "error",
            message:
              "Password must be at least 6 characters, include uppercase, lowercase, and a special character.",
          };
        return { status: "default", message: "" };
      case "confirmPassword":
        if (!value)
          return { status: "error", message: "Please confirm your password." };
        if (value !== form.password)
          return { status: "error", message: "Passwords do not match." };
        return { status: "default", message: "" };
      case "otp":
        if (!value.trim())
          return { status: "error", message: "OTP is required." };
        else if (value.length !== 6 || isNaN(value))
          return { status: "error", message: "OTP must be a 6-digit number." };
        return { status: "default", message: "" };
      default:
        return { status: "default", message: "" };
    }
  };

  // Validate all fields and update validation state
  const validate = (fields) => {
    const result = {};
    fields.forEach((field) => {
      let value;
      switch (field) {
        case "name":
          value = form.name;
          break;
        case "email":
          value = form.email;
          break;
        case "password":
          value = form.password;
          break;
        case "confirmPassword":
          value = form.confirmPassword;
          break;
        case "otp":
          value = form.otp;
          break;
        default:
          value = "";
      }
      result[field] = getFieldValidation(field, value);
    });
    setValidation((prev) => ({ ...prev, ...result }));
    return Object.values(result).every((v) => v.status !== "error");
  };

  const getEmailEndAdornment = () => {
    if (otpLoading) {
      return (
        <Spinner size={24} className="dark:text-neon-green text-blue-500" />
      );
    }
    if (otpSent && !otpVerified) {
      return (
        <div className="dark:text-neon-green flex items-center gap-2 text-blue-500">
          Sent
          <FaPaperPlane size={16} />
        </div>
      );
    }
    if (otpVerified) {
      return (
        <FaRegCheckCircle
          size={16}
          className="dark:text-neon-green text-blue-500"
        />
      );
    }
    return null;
  };

  const getOTPEndAdornment = () => {
    if (otpLoading) {
      return (
        <Spinner size={24} className="dark:text-neon-green text-blue-500" />
      );
    }
    if (resendTimer > 0) {
      return <span className="text-gray-400 select-none">{resendTimer}s</span>;
    }
    return (
      <div
        className="dark:text-neon-green flex cursor-pointer items-center gap-2 text-blue-500"
        onClick={handleSendOtp}
      >
        Resend?
      </div>
    );
  };

  const handleChange = (field, value) => {
    setSubmitError(null);
    let vResultInst = getFieldValidation(field, value);
    setValidation((prev) => ({ ...prev, [field]: vResultInst }));
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSendOtp = async () => {
    console.log("Sending OTP to:", form.email);
    let vResult = validate(["email"]);
    if (!vResult) {
      return;
    }
    if (!form.email) return;
    setOtpLoading(true);
    await dispatch(sendOtp(form.email));
    setOtpLoading(false);
    setResendTimer(120);
  };

  const handleVerifyOtp = async () => {
    let vResult = validate(["email", "otp"]);
    if (!vResult) {
      return;
    }
    setVerifyLoading(true);
    await dispatch(verifyOtp({ email: form.email, otp: form.otp }));
    setVerifyLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let vResult = validate(["email", "name", "password", "confirmPassword"]);
    if (!vResult) {
      return;
    }

    setSignupLoading(true);
    const result = await dispatch(registerUser(form));
    setSignupLoading(false);

    if (result.meta.requestStatus === "fulfilled") {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      {/* Step 1: Email Input */}
      <InputField
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        helperText={validation.email.message}
        status={validation.email.status}
        endAdornment={getEmailEndAdornment()}
        disabled={otpVerified}
      />

      {/* Send OTP Button */}
      {!otpSent && (
        <>
          {/* Error */}
          {submitError && <p className="text-sm text-red-500">{submitError}</p>}
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={otpLoading}
            className="rounded-md bg-blue-600 px-6 py-2 text-white shadow transition dark:bg-[var(--color-neon-green)] dark:text-black dark:hover:brightness-110"
          >
            Send OTP
          </button>
        </>
      )}

      {/* Step 2: OTP Input and Verify Button */}
      {otpSent && !otpVerified && (
        <>
          <InputField
            type="number"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={(e) => handleChange("otp", e.target.value)}
            helperText={validation.otp.message}
            status={validation.otp.status}
            endAdornment={getOTPEndAdornment()}
          />
          {/* Error */}
          {submitError && <p className="text-sm text-red-500">{submitError}</p>}
          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={verifyLoading}
            className="rounded-md bg-blue-600 px-6 py-2 text-white shadow transition dark:bg-[var(--color-neon-green)] dark:text-black dark:hover:brightness-110"
          >
            {verifyLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {/* Step 3: Full Form after OTP Verification */}
      {otpVerified && (
        <>
          <InputField
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            helperText={validation.name.message}
            status={validation.name.status}
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
          />
          <InputField
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            helperText={validation.confirmPassword.message}
            status={validation.confirmPassword.status}
            endAdornment={
              showConfirmPassword ? (
                <FaEyeSlash
                  onClick={() => setShowConfirmPassword(false)}
                  className="cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() => setShowConfirmPassword(true)}
                  className="cursor-pointer"
                />
              )
            }
          />

          {/* Error */}
          {submitError && <p className="text-sm text-red-500">{submitError}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={signupLoading}
            className="rounded-md bg-blue-600 px-6 py-2 text-white shadow transition dark:bg-[var(--color-neon-green)] dark:text-black dark:hover:brightness-110"
          >
            {signupLoading ? "Signing up..." : "Create Account"}
          </button>
        </>
      )}
    </form>
  );
};

SignUpForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
