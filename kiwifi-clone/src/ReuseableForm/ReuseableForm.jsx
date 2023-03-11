import { useState } from "react";
import Joi from "joi";
import InputFeild from "./Input";
import InputPasswordFeild from "./passwordInput";

const ReuseableForm = ({ schema, validations, doSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleForm = (event) => {
    event.preventDefault();
    const validationErrors = handleErrors();
    setErrors(validationErrors || {});
    if (validationErrors) return;
    const tempData = { ...data };
    setData(tempData);
    doSubmit(data);
  };

  const handleErrors = () => {
    const { error } = schema.validate(data, {
      abortEarly: false,
    });
    if (!error) return null;
    const validationErrors = {};
    for (let item of error.details) {
      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  };

  const handleOnChange = ({ currentTarget: input }) => {
    let validationErrors = { ...errors };
    let newMessage = handleOnSaveErrors(input);
    if (newMessage) validationErrors[input.name] = newMessage;
    else delete validationErrors[input.name];
    console.log(newMessage);
    let value = input.value;
    let updatedData = { ...data };
    updatedData[input.name] = value;
    setData(updatedData);
    setErrors(validationErrors);
  };

  const handleOnSaveErrors = ({ name, value }) => {
    const toBeValidate = { [name]: value };
    const OnSaveSchema = Joi.object({ [name]: validations[name] });
    const { error } = OnSaveSchema.validate(toBeValidate);
    return error ? error.details[0].message : null;
  };

  const renderButton = (label) => {
    return (
      <button
        disabled={handleErrors()}
        onClick={handleForm}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };

  const renderInput = (name, label, type) => {
    return (
      <InputFeild
        name={name}
        label={label}
        value={data[name] || ""}
        onChange={handleOnChange}
        type={type}
        error={errors[name]}
      />
    );
  };

  const renderPasswordInput = (name, label) => {
    return (
      <InputPasswordFeild
        name={name}
        label={label}
        value={data[name] || ""}
        onChange={handleOnChange}
        error={errors[name]}
      />
    );
  };

  const matchPasswords = (value) => {
    return value !== data.password ? true : false;
  };
  return {
    handleForm,
    handleOnChange,
    renderButton,
    renderInput,
    renderPasswordInput,
    matchPasswords,
  };
};

export default ReuseableForm;
