import PropTypes from "prop-types";

const statusStyles = {
  error: "border-red-500 focus:ring-red-500",
  success: "border-green-500 focus:ring-green-500",
  default: "border-gray-300 focus:ring-blue-500",
};

const helperTextStyles = {
  error: "text-xs text-red-500 mt-1",
  success: "text-xs text-green-500 mt-1",
  default: "text-xs text-gray-400 mt-1",
};

const InputField = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  helperText = "",
  status = "default",
  endAdornment,
  ...rest
}) => (
  <div>
    <div className="relative flex w-full flex-col">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded bg-gray-100 px-4 py-2 pr-12 text-black transition outline-none dark:bg-[#2a3a5b] dark:text-white ${statusStyles[status]}`}
        {...rest}
      />
      {endAdornment && (
        <div className="absolute top-1/2 right-3 z-10 flex -translate-y-1/2 items-center justify-center">
          {endAdornment}
        </div>
      )}
    </div>
    {helperText && <div className={helperTextStyles[status]}>{helperText}</div>}
  </div>
);

InputField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string,
  status: PropTypes.oneOf(["default", "error", "success"]),
  endAdornment: PropTypes.node,
};

export default InputField;
