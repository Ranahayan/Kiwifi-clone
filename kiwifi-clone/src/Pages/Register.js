import React from "react";
import { useState } from "react";
import ReuseableForm from "../ReuseableForm/ReuseableForm";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/kiwify-logo.png";

import "../styles/style.css";
const Joi = require("joi");

export default function Register() {
  const [data, setData] = useState({
    email: "",
    repeatEmail: "",
    password: "",
  });

  const navigate = useNavigate();

  const validations = {
    email: Joi.string()
      .pattern(/^\S+@\S+\.\S+$/)
      .required()
      .messages({
        "string.empty": "This feild is mendatory",
        "string.pattern.base": "Invalid email formate",
        "string.email": "Invalid email format",
        "any.required": "This feild is mendatory",
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
        "any.required": "This feild is mendatory",
      })
      .label("Repeat Email"),
    password: Joi.string().required().messages({
      "string.empty": "This feild is mendatory",
      "any.required": "This feild is mendatory",
    }),
  };
  const schema = Joi.object(validations);

  async function doSubmit(data) {
    data.isAdmin = false;
    console.log(data);
    await saveUser(data);
  }

  async function saveUser(data) {}

  const {
    renderButton,
    renderInput,
    matchEmail,
    errorMessage,
    renderCheckInputFeild,
  } = ReuseableForm({
    schema,
    validations,
    doSubmit,
  });

  return (
    <div className="loginPage">
      <div className="contentArea d-flex flex-column align-items-center">
        <img src={logoImg} alt="" />
        <span className="heading-1">create new account</span>
        <p>
          Or <a>log into your existing account</a>
        </p>
        <form className="main-form" style={{ width: "33vw" }}>
          {renderInput("email", "Email", "text")}
          {renderInput("repeatEmail", "repeat email", "text")}
          {renderInput("password", "Password", "password")}
          {errorMessage && (
            <div className="register-authError mt-4 mb-8">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 .crossIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    width="24px"
                    height="24px"
                    className="crossIcon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p className="register-authErrorMessage"> {errorMessage}</p>
              </div>
            </div>
          )}

          <div
            className="w-100 d-flex align-items-cener justify-content-end"
            style={{ color: "#5850ec" }}
          >
            <a style={{ fontSize: "0.875rem" }}>Forgot Password?</a>
          </div>
          {renderCheckInputFeild()}
          {renderButton("create an account")}
        </form>
      </div>
    </div>
  );
}
