import React, { useEffect, useState, useContext } from "react";
import { useUser } from "../../hooks/useUser";
import { FormContext } from "../../context/formContext";
import { useLocation } from "react-router-dom";
import { FormItem } from "./FormItem";
import "./UpdateProfileForm.css";
import { useFields } from "../../hooks/useFields";
import { useDefaultValues } from "../../hooks/useDefaultValues";
import { useSchema } from "../../hooks/useSchema";
import { useNavigate } from "react-router-dom";
import { locations } from "../../util/locations";
//import { Image } from "cloudinary-react";

export const UpdateProfileForm = () => {
  const { user, userError } = useUser();
  const [isEdit, setIsEdit] = useState(true);
  const [info, setInfo] = useState("");
  //const [imageIds, setImageIds] = useState([]);

  const [fields, setFields] = useState([]);
  const {
    reset,
    watch,
    onSubmit,
    handleSubmit,
    isLoading,
    formState,
    setSchema,
    register,
    updateUserError,
    setUserPathName,
    isSuccessful,
    setValue,
  } = useContext(FormContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathName =
    location.pathname === "/create-profile" ? "Create" : "Update";

  useEffect(() => {
    if (user) {
      const fields = useFields();
      const schema = useSchema();
      setSchema(schema["user"]);
      setFields(fields["user"]);
      const defaultValues = useDefaultValues(user, fields["user"]);
      reset(defaultValues);
      const id = user._id;
      const pathName = `/user/update/${id}`;
      setUserPathName(pathName);
    }
  }, [user, reset]);

  useEffect(() => {
    if (isSuccessful) {
      setInfo("Lets go to the home page");
      navigate("/");
    }
  }, [isSuccessful]);

  // useEffect(() => {
  //   const loadImages = async () => {
  //     try {
  //       const res = await fetch("/api/images");
  //       const data = await res.json();
  //       setImageIds(data);
  //     } catch (err) {
  //    //   console.log(err);
  //     }
  //   };
  //   loadImages();
  // }, []);

  const data = formState.defaultValues;
  if (!data) {
    return <p>Default data loading...</p>;
  }

  if (userError) {
    return <p>No user we found. You can sign in or sign up</p>;
  }

  const onSave = (data) => {
    const method = "PUT";
    const selectedCityIndex = data.location;
    const selectedCity = locations[selectedCityIndex];
    const body = {
      user: { ...data, location: selectedCity },
    };
    onSubmit(body, method);
  };

  if (isLoading) {
    setTimeout(() => {
      if (!updateUserError) {
        setIsEdit(false);
        setInfo("Profile updated successfully");
      }
    }, 1000);
  }

  setTimeout(() => {
    setInfo("");
  }, 3000);

  return (
    <div className="Profile-form">
      <header>
        <h1>{pathName} Profile</h1>
      </header>
      <form onSubmit={handleSubmit(onSave)}>
        {fields.map((field, index) => (
          <FormItem
            key={index}
            field={field}
            watch={watch}
            isEdit={isEdit}
            setValue={setValue}
            register={register}
            defaultValue={formState.defaultValues[field.name]}
          />
        ))}
        {info && (
          <div className="info">
            <h3>{info}</h3>
          </div>
        )}
        {isEdit ? (
          <div className="Button-group">
            <button onClick={() => setIsEdit(false)}>Cancel</button>
            <button
              type="submit"
              className="Profile-form-button"
              disabled={isLoading}
            >
              {isLoading ? <p>Loading ...</p> : <p>Save</p>}
            </button>
          </div>
        ) : (
          <button onClick={() => setIsEdit(true)}>Edit</button>
        )}
        <div>
          {updateUserError && (
            <div className="error">{updateUserError.toString()}</div>
          )}
        </div>
      </form>

      {/* Cloudinary Gallery
      <div>
        <h1 className="title">Cloudinary Gallery</h1>
        <div className="gallery">
          {imageIds.length > 0 ? (
            imageIds.map((imageId, index) => (
              <Image
                key={index}
                cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                publicId={imageId}
                width="300"
                crop="scale"
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div> */}
    </div>
  );
};
