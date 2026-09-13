import PropTypes from "prop-types";

const WelcomeUser = ({
  user,
  className = "",
  onSignInClick,
  beforeSignInText,
}) => {
  return (
    <div className={`text-sm md:text-base ${className}`}>
      {user ? (
        <p className="text-gray-400 dark:text-gray-300">
          Welcome back, &nbsp;
          <span className="dark:text-neon-green font-semibold text-blue-400">
            {user.name}
          </span>
          👋
        </p>
      ) : (
        <p className="text-gray-400 dark:text-gray-300">
          {beforeSignInText} &nbsp;
          <button
            // onClick={onSignInClick}
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
};
