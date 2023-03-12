import React from "react";
import "../styles/style.css";

const CheckInputFeild = ({ error, ...rest }) => {
  return (
    <div className="form-check terms">
      <input
        {...rest}
        className="form-check-input"
        type="checkbox"
        value=""
        id="termsCheckbox"
      />
      <label className="form-check-label" for="termsCheckbox">
        I have read and accept kiwify's <a href="/random">terms</a> of use ,{" "}
        <a href="/random">software license terms</a> ,
        <a href="/random">content policy</a>.
      </label>
      {error && (
        <div className="text-danger mt-1">
          <p className="errorMessage">{error}</p>
        </div>
      )}{" "}
    </div>
  );
};

export default CheckInputFeild;
