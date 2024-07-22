const fieldTypes = {
  text: ["firstname", "lastname", "location"],
  image: ["profile_picture"],
  textarea: ["bio"],
  date: ["birthday"],
  checkbox: ["hobbies", "languages"],
  radio: ["gender", "preferred_gender"],
};

const options = {
  hobbies: ["Reading", "Traveling", "Cooking"],
  languages: ["English", "Spanish", "French"],
  gender: ["Male", "Female", "Non-binary"],
};

const excludedFields = ["_id", "__v", "email", "password", "created_at"];

export const createFieldConfig = (key, value) => {
  if (excludedFields.includes(key)) {
    return null;
  }

  let type = "text";
  for (const [fieldType, keys] of Object.entries(fieldTypes)) {
    if (keys.includes(key)) {
      type = fieldType;
      break;
    }
  }

  const fieldConfig = {
    type,
    name: key,
    placeholder: key.charAt(0).toUpperCase() + key.slice(1),
    defaultValue: value,
    fieldLabel: key.charAt(0).toUpperCase() + key.slice(1) + ":",
  };

  if (type === "checkbox" || type === "radio") {
    fieldConfig.options = options[key];
  }

  return fieldConfig;
};