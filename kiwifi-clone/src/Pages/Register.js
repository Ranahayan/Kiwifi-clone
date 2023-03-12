import React from "react";
import { useState } from "react";
import ReuseableForm from "../ReuseableForm/ReuseableForm";
import { useNavigate } from "react-router-dom";
const Joi = require("joi");

export default function Register() {
  const [data, setData] = useState({
    email: "",
    repeatEmail: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validations = {
    email: Joi.string()
      .pattern(/^\S+@\S+\.\S+$/)
      .required()
      .messages({
        "string.empty": "This feild is mendatory",
        "string.pattern.base": "Invalid email formate",
        "string.email": "Invalid email format",
      })
      .label("Email"),
    repeatEmail: Joi.string()
      .custom((value, helper) => {
        if (matchEmail(value)) {
          return helper.message("Email does not match");
        }

        return value;
      })
      .required()
      .messages({
        "string.empty": "This feild is mendatory",
      })
      .label("Repeat Email"),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).*$/)
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter,\n one digit, one special character, and be at least 8 characters long",
        "string.empty": "This feild is mendatory",
      }),
  };
  const schema = Joi.object(validations);

  async function doSubmit(data) {
    data.isAdmin = false;
    console.log(data);
    await saveUser(data);
    console.log(errorMessage);
  }

  async function saveUser(data) {}

  const { renderButton, renderInput, matchEmail } = ReuseableForm({
    schema,
    validations,
    doSubmit,
  });

  return (
    <div className="main">
      <form className="container main-form pt-3 pb-3" style={{ width: "40vw" }}>
        {renderInput("email", "Email", "text")}
        {renderInput("repeatEmail", "repeat email", "text")}
        {renderInput("password", "Password", "password")}
        {errorMessage && (
          <div className="alert alert-danger mt-1">{errorMessage}</div>
        )}

        {renderButton("Register")}
      </form>
    </div>
  );
}
