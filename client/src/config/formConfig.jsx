export const Gender = ["Male", "Female", "Non-binary"];
export const Hobbies = ["Reading", "Traveling", "Cooking"];
export const Languages = ["English", "Spanish", "French"];

export const formConfig = [
  { type: "text", name: "firstName", placeholder: "First Name" },
  { type: "text", name: "lastName", placeholder: "Last Name" },
  { type: "text", name: "location", placeholder: "Location" },
  { type: "textarea", name: "bio", placeholder: "Bio" },
  {
    type: "date",
    name: "birthdate",
    placeholder: "Birthday",
    fieldLabel: "Birthday:",
  },
  {
    type: "number",
    name: "minAge",
    placeholder: "Min Age Preference",
    defaultValue: 18,
    fieldLabel: "Min Age Preference:",
  },
  {
    type: "number",
    name: "maxAge",
    placeholder: "Max Age Preference",
    defaultValue: 99,
    fieldLabel: "Max Age Preference:",
  },
  {
    type: "number",
    name: "maxDistance",
    placeholder: "Max Distance Preference (km)",
    defaultValue: 50,
    fieldLabel: "Max Distance Preference (km):",
  },
  {
    type: "checkbox",
    name: "hobbies",
    options: Hobbies,
    fieldLabel: "Hobbies:",
  },
  {
    type: "checkbox",
    name: "languages",
    options: Languages,
    fieldLabel: "Languages:",
  },
  { type: "radio", name: "gender", options: Gender, fieldLabel: "Gender" },
  {
    type: "radio",
    name: "preferredGender",
    options: Gender,
    fieldLabel: "Preferred Gender",
  },
];
