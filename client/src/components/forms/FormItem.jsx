import React, { useState } from "react";
import PropTypes from "prop-types";
import Alert from "../Alert";
import "./FormItem.css";
import { formatDate } from "../../util/formatData";
import { ProfileHobbies } from "./ProfileHobbies";

export const FormItem = ({ field, register, watch, isEdit, setValue }) => {
  const { type, placeholder, name, fieldLabel, options } = field;
  const newObje = watch();

  //  for image upload
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      setErrMsg("Something went wrong!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
      setFileInputState("");
      setPreviewSource("");
      setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      setErrMsg("Something went wrong!");
    }
  };

  const isChecked = (option) => {
    const newArray = newObje?.[name];

    if (Array.isArray(newArray)) {
      return newArray.includes(option);
    } else {
      return newObje?.[name] === option;
    }
  };

  const renderField = () => {
    switch (type) {
      case "text":
      case "number":
      case "date":
        return (
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            {...register(name)}
            value={
              type === "date" && !isEdit
                ? formatDate(newObje[name])
                : newObje[name]
            }
            readOnly={!isEdit}
          />
        );
      case "textarea":
        return (
          <textarea
            id={name}
            className={name}
            placeholder={placeholder}
            {...register(name)}
            readOnly={!isEdit}
          />
        );
      case "image":
        if (isEdit) {
          return (
            <div>
              <h1 className="title">Upload an Image</h1>
              {errMsg && <Alert msg={errMsg} type="danger" />}
              {successMsg && <Alert msg={successMsg} type="success" />}
              <form onSubmit={handleSubmitFile} className="form">
                <input
                  id="fileInput"
                  type="file"
                  name="image"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  className="form-input"
                />
                <button className="btn" type="submit">
                  Submit
                </button>
              </form>
              {previewSource && (
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{ height: "300px" }}
                />
              )}
            </div>
          );
        } else {
          return (
            <img
              src={newObje[name]}
              {...register(name)}
              className="pro-img"
              alt={"Profile picture is not available"}
            />
          );
        }
      case "location":
        if (isEdit) {
          return (
            <select
              id={name}
              className={name}
              {...register(name)}
              defaultValue={newObje?.[name][0]?.city}
            >
              <option value="">Select a location</option>
              {options?.map((option, index) => (
                <option key={index} value={index}>
                  {option.city}
                </option>
              ))}
            </select>
          );
        } else {
          return (
            <span className="default-value">{newObje?.[name][0]?.city}</span>
          );
        }
      case "select":
        if (isEdit) {
          return (
            <ProfileHobbies
              options={options}
              register={register}
              setValue={setValue}
            />
          );
        } else {
          return <span className="default-value">{newObje[name]}</span>;
        }
      case "checkbox":
      case "radio":
        if (isEdit) {
          return (
            <div className="options">
              {options?.map((option) => (
                <div key={option} className="options-label">
                  <span>{option} </span>
                  <input
                    type={type}
                    className={"options-input"}
                    checked={isChecked(option)}
                    value={option}
                    {...register(name)}
                  />
                </div>
              ))}
            </div>
          );
        } else {
          const defaultValue = newObje?.[name];
          if (Array.isArray(defaultValue)) {
            return (
              <div className="default-values">
                {defaultValue.map((value) => (
                  <span key={value} className="default-value">
                    {value}
                  </span>
                ))}
              </div>
            );
          } else {
            return <span className="default-value">{defaultValue}</span>;
          }
        }
      default:
        return null;
    }
  };

  return (
    <div
      className={`Profile-form-input ${fieldLabel === "Hobbies" && "hobbies-container"}`}
    >
      {fieldLabel && <label htmlFor={name}>{fieldLabel}</label>}
      {renderField()}
    </div>
  );
};

FormItem.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    fieldLabel: PropTypes.string,
    options: PropTypes.array,
  }).isRequired,
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
};
