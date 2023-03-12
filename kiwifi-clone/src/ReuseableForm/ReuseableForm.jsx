import { useState } from "react";
import Joi from "joi";
import InputFeild from "./Input";
import CheckInputFeild from "./checkInput";

const ReuseableForm = ({ schema, validations, doSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [feildBorderstatus, setFeildBorderstatus] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(true);

  const handleForm = (event) => {
    event.preventDefault();
    const validationErrors = handleErrors();
    setErrors(validationErrors || {});
    if (validationErrors) return;
    if (data.password.length < 8) {
      setErrorMessage("auth/weak-password");
    } else {
      setErrorMessage("");
    }
    const tempData = { ...data };
    setData(tempData);
    doSubmit(data);
  };

  const handleErrors = () => {
    let { error } = schema.validate(data, {
      abortEarly: false,
    });
    if (termsAndConditions && !error) {
      error = {};
      error.checkInputFeild = "This field is mandatory";
      return error;
    } else {
      if (!error) return null;
      const validationErrors = {};
      for (let item of error.details) {
        validationErrors[item.path[0]] = item.message;
      }
      if (termsAndConditions)
        validationErrors.checkInputFeild = "This field is mandatory";

      return validationErrors;
    }
  };

  const handleOnChange = ({ currentTarget: input }) => {
    let value = input.value;
    let updatedData = { ...data };
    updatedData[input.name] = value;
    setData(updatedData);
  };

  const handleOnFocusOut = ({ currentTarget: input }) => {
    let validationErrors = { ...errors };
    let newMessage = handleOnSaveErrors(input);
    if (newMessage) {
      newMessage === "Email does not match"
        ? (validationErrors["repeatEmail"] = newMessage)
        : (validationErrors[input.name] = newMessage);
    } else {
      if (
        input.name === "email" &&
        errors.repeatEmail === "Email does not match"
      ) {
        delete validationErrors["repeatEmail"];
      }
      delete validationErrors[input.name];
    }
    setErrors(validationErrors);
  };

  const handleOnSaveErrors = ({ name, value }) => {
    setFeildBorderstatus(!termsAndConditions);

    const toBeValidate = { [name]: value };
    let OnSaveSchema = "";
    if (name === "email" && data.repeatEmail) {
      toBeValidate.repeatEmail = data.repeatEmail;
      OnSaveSchema = Joi.object({
        [name]: validations[name],
        repeatEmail: validations.repeatEmail,
      });
    } else {
      OnSaveSchema = Joi.object({
        [name]: validations[name],
      });
    }
    const { error } = OnSaveSchema.validate(toBeValidate);
    console.log(error);
    return error ? error.details[0].message : null;
  };

  const onFocus = () => {
    setFeildBorderstatus(!termsAndConditions);
  };

  const renderButton = (label) => {
    return (
      <button onClick={handleForm} className="btn customBtn ">
        {label}
      </button>
    );
  };

  const handleTermsAndConditions = () => {
    setTermsAndConditions(!termsAndConditions);
  };

  const renderInput = (name, label, type) => {
    return (
      <InputFeild
        name={name}
        label={label}
        value={data[name] || ""}
        onChange={handleOnChange}
        onBlur={handleOnFocusOut}
        onFocus={onFocus}
        type={type}
        error={errors[name]}
        feildBorderstatus={feildBorderstatus}
      />
    );
  };
  const renderCheckInputFeild = () => {
    return (
      <CheckInputFeild
        error={errors["checkInputFeild"]}
        onClick={handleTermsAndConditions}
      />
    );
  };
  const matchEmail = (value) => {
    return value !== data.email ? true : false;
  };
  return {
    handleForm,
    handleOnChange,
    renderButton,
    renderInput,
    errorMessage,
    renderCheckInputFeild,
    matchEmail: matchEmail,
  };
};

export default ReuseableForm;
