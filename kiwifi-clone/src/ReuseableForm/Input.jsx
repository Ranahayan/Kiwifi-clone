import { rest } from "lodash";
import React from "react";
import "../styles/style.css";

const InputFeild = ({ name, label, error, feildBorderstatus, ...rest }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        id={name}
        name={name}
        autoComplete="new-password"
        className={
          error
            ? !feildBorderstatus
              ? "form-control regisetr-inputBorderForError"
              : "form-control"
            : "form-control"
        }
      />
      {error && (
        <div className="text-danger mt-1">
          <p className="errorMessage">{error}</p>
        </div>
      )}
    </div>
  );
};

export default InputFeild;
