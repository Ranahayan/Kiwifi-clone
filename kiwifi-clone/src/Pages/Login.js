import React from "react";
import "../styles/style.css";
import logoImg from "../assets/kiwify-logo.png";
import { Link, useNavigate } from "react-router-dom";
import ReuseableForm from "../ReuseableForm/ReuseableForm";
import { useState } from "react";
const Joi = require("joi");


export default function Login() {
  const [data, setData] = useState({
    email: "",
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
        "any.required": "This feild is mendatory",
      })
      .label("Email"),
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
    console.log(errorMessage);
  }

  async function saveUser(data) {
    // sigup api
  }

  const { renderButton, renderInput } = ReuseableForm({
    schema,
    validations,
    doSubmit,
  });
  return (
    <div className="authPage">
      <div className="contentArea d-flex flex-column align-items-center">
        <div className="logoArea">
          <img src={logoImg} alt="" />
        </div>
        <span className="heading-1">Login to your account</span>
        <p>
          Or <Link to='/'>register</Link>
        </p>
        <form className="main-form" style={{ width: "33vw" }}>
          {renderInput("email", "E-mail", "text")}
          {renderInput("password", "Password", "password")}
          {errorMessage && (
            <div className="alert alert-danger mt-1">{errorMessage}</div>
          )}

          <div
            className="w-100 d-flex align-items-cener justify-content-end"
            style={{ color: "#5850ec" }}
          >
            <a style={{ fontSize: "0.875rem" }}>Forgot Password?</a>
          </div>

          {renderButton("To enter")}
        </form>
      </div>
    </div>
  );
}
