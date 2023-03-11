import { rest } from "lodash";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const InputPasswordFeild = ({ name, label, error, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPasswords = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="form-group mb-3">
      <label htmlFor={name}>{label}</label>
      <div className="input-group mb-3">
        <div
          type="button"
          className="bg-white input-group-text"
          onClick={toggleShowPasswords}
        >
          {showPassword ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </div>
        <input
          {...rest}
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          className="form-control"
        />
      </div>
      {error && <div className="alert alert-danger mt-1">{error}</div>}
    </div>
  );
};

export default InputPasswordFeild;
