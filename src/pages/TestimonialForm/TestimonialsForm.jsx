import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import VoiceCard from "../../components/VoiceCard";
import {
  createTestimonial,
  resetTestimonialState,
} from "../../state/slice/testimonialSlice";
import { uploadAvatar } from "../../state/slice/authSlice";

const defaultAvatar = "https://i.pravatar.cc/150?img=36";

export default function TestimonialForm() {
  // State
  const dispatch = useDispatch();
  const { user, avatarUploadStatus, avatarUploadError } = useSelector(
    (state) => state.auth,
  );
  const testimonialState = useSelector((state) => state.testimonial);

  const [form, setForm] = useState({
    avatar: "",
    name: "",
    email: "",
    currentPosition: "",
    company: "",
    socialLinks: { linkedIn: "" },
    shortMessage: "",
    fullMessage: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [flipped, setFlipped] = useState(false);

  // Effects
  useEffect(() => {
    if (user) {
      // If user has at least one testimonial, use the latest (populated by backend)
      const latestTestimonial =
        Array.isArray(user.testimonials) && user.testimonials.length > 0
          ? user.testimonials[0]
          : null;

      setForm((f) => ({
        ...f,
        name: user.name || "",
        email: user.email || "",
        currentPosition: latestTestimonial?.currentPosition || user.currentPosition || "",
        company: latestTestimonial?.company || user.company || "",
        socialLinks: {
          linkedIn: latestTestimonial?.socialLinks?.linkedIn || user.socialLinks?.linkedIn || "",
        },
        shortMessage: latestTestimonial?.shortMessage || "",
        fullMessage: latestTestimonial?.fullMessage || "",
        avatar: latestTestimonial?.avatar || user.avatarUrl || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(resetTestimonialState());
    };
  }, [dispatch]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "linkedIn") {
      setForm((f) => ({
        ...f,
        socialLinks: { ...f.socialLinks, linkedIn: value },
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleImageUpload = (file) => {
    if (!file.type.startsWith("image/")) return;
    setAvatarFile(file);
    // For preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetTestimonialState());

    let avatarUrl = form.avatar;

    if (avatarFile) {
      try {
        const url = await dispatch(uploadAvatar(avatarFile)).unwrap();
        avatarUrl = url;
      } catch (err) {
        // Optionally show error
        return;
      }
    }

    dispatch(
      createTestimonial({
        ...form,
        avatarUrl: avatarUrl,
        user: user?._id,
        avatar: undefined,
      }),
    );
  };

  // Render
  const {
    avatar,
    name,
    email,
    currentPosition,
    company,
    socialLinks,
    shortMessage,
    fullMessage,
  } = form;
  const avatarUrl = avatar.trim() || defaultAvatar;

  const menuItems = [{ label: "Get back to me", href: "/" }];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#e4e4e7] text-black transition-all duration-500 dark:bg-[#0d1117] dark:bg-gradient-to-br dark:from-[#0b0f19] dark:to-[#111827] dark:text-gray-200">
      <Navbar menuItems={menuItems} />

      <div
        id="testimonial-form"
        className="font-poppins flex min-h-[80vh] flex-col items-center px-6 py-4 text-gray-800 transition-all duration-500 dark:text-white"
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Your Feedback Means a Lot
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Take a moment to fill this out — we’d love to hear your thoughts.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Preview Card */}
          <div>
            <h3 className="mb-4 text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
              How Others Will See It — Before You Submit...
            </h3>
            <VoiceCard
              t={{
                id: "preview",
                avatar: avatarUrl,
                name: name || "Your Name",
                role: currentPosition || "Your Role",
                company: company || "Your Company",
                linkedIn: socialLinks?.linkedIn,
                message:
                  shortMessage || "Your short testimonial message here...",
                fullMessage:
                  fullMessage ||
                  "Your full detailed testimonial message here...",
                upvotedSkills: [],
                date: new Date().toLocaleDateString(),
              }}
              flippedCardId={flipped ? "preview" : null}
              setFlippedCardId={(val) => setFlipped(val === "preview")}
            />
          </div>

          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-xl space-y-5 text-left"
            onSubmit={handleSubmit}
          >
            {/* file upload div */}
            <div
              className="relative w-full cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-4 text-center transition-all duration-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-[var(--color-neon-green)]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) handleImageUpload(file);
              }}
            >
              <label
                htmlFor="avatar-upload"
                className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Upload Avatar (Click or Drag & Drop)
              </label>
              <input
                id="avatar-upload"
                name="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />

              <div
                onClick={() => document.getElementById("avatar-upload").click()}
                className="flex flex-col items-center justify-center space-y-2"
              >
                {form.avatar ? (
                  <div className="relative">
                    <img
                      src={form.avatar}
                      alt="Avatar Preview"
                      className="h-24 w-24 rounded-full border border-gray-400 object-cover shadow dark:border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm((prev) => ({ ...prev, avatar: "" }));
                        setAvatarFile(null);
                      }}
                      className="dark:text-neon-green absolute -top-2 right-0 text-2xl text-blue-600 opacity-70 transition hover:opacity-100 focus:outline-none"
                      aria-label="Remove avatar"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Click or drag an image here
                    </div>
                    <div className="text-xs text-gray-400">
                      (Supported formats: JPG, PNG, GIF)
                    </div>
                  </>
                )}
              </div>
              {avatarUploadError && (
                <div className="mt-2 text-xs text-red-500">
                  {avatarUploadError}
                </div>
              )}
            </div>

            <input
              name="name"
              type="text"
              placeholder="Your Name"
              required
              value={name}
              onChange={handleChange}
              disabled
              className="w-full rounded-md border border-gray-300 bg-gray-100 p-3 text-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-[var(--color-neon-green)]"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              value={email}
              onChange={handleChange}
              disabled
              className="w-full rounded-md border border-gray-300 bg-gray-100 p-3 text-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-[var(--color-neon-green)]"
            />
            <input
              name="currentPosition"
              type="text"
              placeholder="Your Role"
              value={currentPosition}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:text-white dark:focus:ring-[var(--color-neon-green)]"
            />
            <input
              name="company"
              type="text"
              placeholder="Company"
              value={company}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:text-white dark:focus:ring-[var(--color-neon-green)]"
            />
            <input
              name="linkedIn"
              type="url"
              placeholder="LinkedIn URL"
              value={socialLinks?.linkedIn}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:text-white dark:focus:ring-[var(--color-neon-green)]"
            />
            <textarea
              name="shortMessage"
              placeholder="Short Message"
              required
              rows={3}
              value={shortMessage}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:text-white dark:focus:ring-[var(--color-neon-green)]"
            />
            <textarea
              name="fullMessage"
              placeholder="Full Message"
              required
              rows={5}
              value={fullMessage}
              onChange={handleChange}
              onFocus={() => setFlipped(true)}
              onBlur={() => setFlipped(false)}
              className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#0d1117] dark:text-white dark:focus:ring-[var(--color-neon-green)]"
            />
            {testimonialState.error && (
              <div className="text-sm text-red-500">
                {testimonialState.error}
              </div>
            )}
            {testimonialState.success && (
              <div className="text-sm text-green-600">
                Thank you for your testimonial!
              </div>
            )}
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-6 py-2 text-white shadow transition hover:bg-blue-700 dark:bg-[var(--color-neon-green)] dark:text-black dark:hover:brightness-110"
              disabled={
                testimonialState.status === "loading" ||
                avatarUploadStatus === "loading"
              }
            >
              {testimonialState.status === "loading" ||
              avatarUploadStatus === "loading"
                ? "Submitting..."
                : "Submit Testimonial"}
            </button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
