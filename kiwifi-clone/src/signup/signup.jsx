import React from "react";
import "./signup.css";
import { useState } from "react";
import ReuseableForm from "../../ReuseableForm/ReuseableForm";
import { useNavigate } from "react-router-dom";
const Joi = require("joi");
const axios = require("axios");

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validations = {
    name: Joi.string().min(3).required().label("Name"),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .label("Email"),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).*$/)
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter,\n one digit, one special character, and be at least 8 characters long",
      }),
    confirmPassword: Joi.string()
      .custom((value, helper) => {
        if (matchPasswords(value)) {
          return helper.message("Confirm Password must match password");
        }

        return value;
      })
      .required(),
  };
  const schema = Joi.object(validations);

  async function doSubmit(data) {
    data.isAdmin = false;
    console.log(data);
    await saveUser(data);
    console.log(errorMessage);
  }

  async function saveUser(data) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/",
        data
      );
      setErrorMessage("");
      navigate("/login");
      console.log(errorMessage);
    } catch (error) {
      if (error.response.status !== 400) {
        setErrorMessage("Some Unexpected error occurs");
      } else {
        console.log(error);
        setErrorMessage(error.response.data);
        console.log(errorMessage);
      }
    }
  }

  const { renderButton, renderInput, renderPasswordInput, matchPasswords } =
    ReuseableForm({
      schema,
      validations,
      doSubmit,
    });

  return (
    <div className="main">
      <form className="container main-form pt-3 pb-3" style={{ width: "40vw" }}>
        {renderInput("name", "Name", "name")}
        {renderInput("email", "Email", "email")}
        {renderPasswordInput("password", "Password")}
        {renderPasswordInput("confirmPassword", "Confirm Password")}
        {errorMessage && (
          <div className="alert alert-danger mt-1">{errorMessage}</div>
        )}

        {renderButton("Register")}
      </form>
    </div>
  );
}
