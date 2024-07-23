import { createFieldConfig } from "./createFieldConfig";

export const convertUserToFormData = (user) => {
  const desiredOrder = [
    "profile_picture",
    "firstName",
    "lastName",
    "location",
    "bio",
    "birthday",
    "gender",
    "preferred_gender",
    "min_age_preference",
    "max_age_preference",
    "max_distance_preference",
    "hobbies",
    "languages",
  ];
  // Create field configurations
  if (!user) return;
  //get the keys of the user object and covert to form data
  const fieldConfigs = Object.entries(user)
    .map(([key, value]) => createFieldConfig(key, value))
    .filter((config) => config !== null);
  // sort the form data
  const sortedFormData = desiredOrder
    .map((name) => fieldConfigs.find((field) => field.name === name))
    .filter((field) => field !== undefined);
  return sortedFormData;
};
