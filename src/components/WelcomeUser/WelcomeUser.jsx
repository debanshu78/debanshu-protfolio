import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../state/slice/authSlice";

const WelcomeUser = ({
  user,
  className = "",
  onSignInClick,
  beforeSignInText,
  beforeNameText = "Welcome Back,",
}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={`text-sm md:text-base ${className}`}>
      {user ? (
        <>
          <p className="text-gray-400 dark:text-gray-300">
            {beforeNameText} &nbsp;
            <span className="dark:text-neon-green font-semibold text-blue-400">
              {user.name}
            </span>
            👋
            <br />
            <span className="mt-2 inline-block rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-600 transition dark:bg-[#2a2323] dark:text-red-400">
              Not you?{" "}
              <button
                onClick={handleLogout}
                className="ml-1 rounded px-2 py-0.5 font-semibold text-red-600 underline underline-offset-4 transition hover:bg-red-600 hover:text-white dark:hover:bg-red-400 dark:hover:text-black"
              >
                Logout
              </button>
            </span>
          </p>
        </>
      ) : (
        <p className="text-gray-400 dark:text-gray-300">
          {beforeSignInText} &nbsp;
          <button
            onClick={onSignInClick}
            className="dark:text-neon-green dark:hover:text-neon-green font-medium text-blue-600 underline underline-offset-4 hover:text-blue-800"
          >
            Sign in
          </button>
        </p>
      )}
    </div>
  );
};

export default WelcomeUser;

WelcomeUser.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  className: PropTypes.string,
  onSignInClick: PropTypes.func.isRequired,
  beforeSignInText: PropTypes.string,
  beforeNameText: PropTypes.string,
};
