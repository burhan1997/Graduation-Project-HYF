import React, { useEffect, useContext, useState } from "react";
import { FormContext } from "../context/formContext";
import { useNavigate } from "react-router-dom";
import { FormItem } from "./forms/FormItem";
import "./forms/UpdateProfileForm.css";
import { useFields } from "../hooks/useFields";
import { useDefaultValues } from "../hooks/useDefaultValues";
import { useSchema } from "../hooks/useSchema";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export const ShowProfile = () => {
  const { reset, watch, formState, setSchema, register } =
    useContext(FormContext);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [fields, setFields] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    return () => cancelFetch();
  }, [cancelFetch]);

  const onReceived = (data) => {
    const user = data?.user;
    if (data?.success) {
      setUser(user);
    }
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/${id}`,
    onReceived,
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [id]);

  useEffect(() => {
    if (user) {
      const fields = useFields();
      const schema = useSchema();
      setSchema(schema["user"]);
      setFields(fields["user"]);
      const defaultValues = useDefaultValues(user, fields["user"]);
      reset(defaultValues);
    }
  }, [user]);

  const data = formState.defaultValues;
  if (!data) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>No user we found. You can sign in or sign up</p>;
  }

  return (
    <div className="Profile-form">
      {isLoading && <div>Loading...</div>}
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <header>
        <h1>{user?.firstName} Profile</h1>
      </header>
      <form>
        {Object.values(fields || {})?.map((field, index) => (
          <FormItem
            key={index}
            field={field}
            watch={watch}
            isEdit={false}
            register={register}
            defaultValue={formState.defaultValues[field.name]}
          />
        ))}
        <div>{error && <div className="error">{error.toString()}</div>}</div>
      </form>
    </div>
  );
};