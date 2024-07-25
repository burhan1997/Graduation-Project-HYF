import * as yup from "yup";

export const useUserSchema = () => {
  return yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    location: yup.string(),
    bio: yup.string(),
    birthday: yup.date(),
    gender: yup.string(),
    preferred_gender: yup.string(),
    min_age_preference: yup.number(),
    max_age_preference: yup.number(),
    max_distance_preference: yup.number(),
    hobbies: yup.array(),
    languages: yup.array(),
  });
};

export const userFields = [
  {
    name: "profile_picture",
    type: "image",
    placeholder: "Please enter a URL",
    fieldLabel: "Profile Picture",
  },
  {
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    fieldLabel: "First Name",
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    fieldLabel: "Last Name",
  },
  {
    name: "location",
    type: "text",
    placeholder: "Location",
    fieldLabel: "Location",
  },
  { name: "bio", type: "textarea", placeholder: "Bio", fieldLabel: "Bio" },
  {
    name: "birthday",
    type: "date",
    placeholder: "Birthday",
    fieldLabel: "Birthday",
  },
  {
    name: "gender",
    type: "radio",
    placeholder: "Gender",
    fieldLabel: "Gender",
    options: ["Male", "Female", "Non-binary"],
  },
  {
    name: "preferred_gender",
    type: "radio",
    placeholder: "Preferred",
    fieldLabel: "Preferred Gender",
    options: ["Male", "Female", "Non-binary"],
  },
  {
    name: "min_age_preference",
    type: "number",
    placeholder: "Min Age Preference",
    fieldLabel: "Min Age Preference",
  },
  {
    name: "max_age_preference",
    type: "number",
    placeholder: "Max Age Preference",
    fieldLabel: "Max Age Preference",
  },
  {
    name: "max_distance_preference",
    type: "number",
    placeholder: "Max Distance Preference",
    fieldLabel: "Max Distance Preference",
  },
  {
    name: "hobbies",
    type: "checkbox",
    placeholder: "Hobbies",
    fieldLabel: "Hobbies",
    options: ["Reading", "Traveling", "Cooking"],
  },
  {
    name: "languages",
    type: "checkbox",
    placeholder: "Languages",
    fieldLabel: "Languages",
    options: ["English", "Spanish", "French"],
  },
];