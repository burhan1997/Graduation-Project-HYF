import * as yup from "yup";

export const userSchema = () => {
  return yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    location: yup.array().required(),
    bio: yup.string().required(),
    birthday: yup.date().required(),
    gender: yup.string().required(),
    preferred_gender: yup.string().required(),
    min_age_preference: yup.number().required(),
    max_age_preference: yup.number().required(),
    max_distance_preference: yup.number().required(),
    hobbies: yup.array().required(),
    languages: yup.array().required(),
  });
};
