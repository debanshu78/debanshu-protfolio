// import PropTypes from "prop-types";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import InputField from "../InputField/InputField";
// import {
//   sendOtp,
//   verifyOtpAndSignup,
//   signin,
// } from "../../state/slice/authSlice";

// export const AuthForm = ({ mode, onSuccess }) => {
//   const dispatch = useDispatch();
//   const { loading, error, otpSent } = useSelector((state) => state.auth);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [validation, setValidation] = useState({});

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const validateFields = () => {
//     const v = {};
//     if (mode === "signup") {
//       if (!name.trim()) v.name = "Name is required.";
//       if (!email.trim()) v.email = "Email is required.";
//       else if (!isValidEmail(email)) v.email = "Invalid email.";
//       if (!password) v.password = "Password is required.";
//       if (password !== confirmPassword)
//         v.confirmPassword = "Passwords do not match.";
//       if (!otp) v.otp = "OTP is required.";
//     } else {
//       if (!email.trim()) v.email = "Email is required.";
//       if (!password) v.password = "Password is required.";
//     }
//     setValidation(v);
//     return Object.keys(v).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateFields()) return;

//     if (mode === "signup") {
//       dispatch(verifyOtpAndSignup({ name, email, otp, password })).then(
//         (res) => {
//           if (!res.error) onSuccess();
//         },
//       );
//     } else {
//       dispatch(signin({ email, password })).then((res) => {
//         if (!res.error) onSuccess();
//       });
//     }
//   };

//   const handleSendOtp = () => {
//     if (!email || !isValidEmail(email)) {
//       setValidation((prev) => ({
//         ...prev,
//         email: "Enter a valid email to send OTP.",
//       }));
//       return;
//     }
//     dispatch(sendOtp(email));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
//       {mode === "signup" && (
//         <InputField
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           helperText={validation.name}
//         />
//       )}
//       <InputField
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         helperText={validation.email}
//       />
//       <InputField
//         type={showPassword ? "text" : "password"}
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         helperText={validation.password}
//         endAdornment={
//           showPassword ? (
//             <FaEyeSlash onClick={() => setShowPassword(false)} />
//           ) : (
//             <FaEye onClick={() => setShowPassword(true)} />
//           )
//         }
//       />
//       {mode === "signup" && (
//         <InputField
//           type={showConfirmPassword ? "text" : "password"}
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           helperText={validation.confirmPassword}
//           endAdornment={
//             showConfirmPassword ? (
//               <FaEyeSlash onClick={() => setShowConfirmPassword(false)} />
//             ) : (
//               <FaEye onClick={() => setShowConfirmPassword(true)} />
//             )
//           }
//         />
//       )}
//       {mode === "signup" && otpSent && (
//         <InputField
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           helperText={validation.otp}
//         />
//       )}
//       {mode === "signup" && !otpSent && (
//         <button
//           type="button"
//           onClick={handleSendOtp}
//           className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
//         >
//           Send OTP
//         </button>
//       )}
//       {error && <p className="text-sm text-red-500">{error}</p>}
//       <button
//         type="submit"
//         disabled={loading}
//         className="rounded-md bg-green-600 px-6 py-2 text-white shadow hover:brightness-110"
//       >
//         {mode === "signin" ? "Sign In" : "Verify & Sign Up"}
//       </button>
//     </form>
//   );
// };

// AuthForm.propTypes = {
//   mode: PropTypes.oneOf(["signin", "signup"]).isRequired,
//   onSuccess: PropTypes.func.isRequired,
// };
