import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { Alert } from "../Alert";
import PropTypes from "prop-types";
import "./UploadImage.css";

export const UploadImage = ({ setValue, defaultImage }) => {
  //  for image upload
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isChangeImage, setIsChangeImage] = useState(false);

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

  useEffect(() => {
    return () => cancelFetch();
  }, [cancelFetch]);

  const onReceived = (data) => {
    setUploadedImage(data?.data?.url);
  };
  const { error, performFetch, cancelFetch } = useFetch("/upload", onReceived);

  const uploadImage = async (base64EncodedImage) => {
    try {
      performFetch({
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

  useEffect(() => {
    if (uploadedImage) {
      setValue("profile_picture", uploadedImage);
      setIsChangeImage(false);
      setUploadedImage(null);
    }
  }, [uploadedImage]);

  return (
    <div className="upload-image">
      {errMsg && <Alert msg={errMsg} type="danger" />}
      {successMsg && <Alert msg={successMsg} type="success" />}
      {isChangeImage && (
        <>
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
            className="form-input"
          />
          <div className="button-group">
            <button className="btn" onClick={handleSubmitFile}>
              Submit
            </button>
            <button className="btn" onClick={() => setIsChangeImage(false)}>
              Cancel
            </button>
          </div>
        </>
      )}
      {!isChangeImage && (
        <button className="btn" onClick={() => setIsChangeImage(true)}>
          Change Image
        </button>
      )}

      {uploadedImage && !isChangeImage && (
        <img
          src={uploadedImage}
          className="pro-img"
          alt={"Profile picture is not available"}
        />
      )}

      {defaultImage && !isChangeImage && (
        <img
          className="pro-img"
          src={defaultImage}
          alt="chosen"
          style={{ height: "300px" }}
        />
      )}
      {previewSource && (
        <img
          className="pro-img"
          src={previewSource}
          alt="chosen"
          style={{ height: "300px" }}
        />
      )}
      {error && <Alert msg={error} type="danger" />}
    </div>
  );
};

UploadImage.propTypes = {
  setValue: PropTypes.func.isRequired,
  defaultImage: PropTypes.string,
};
