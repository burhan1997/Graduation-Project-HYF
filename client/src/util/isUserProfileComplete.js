import { useUserSchema } from "../hooks/schemas/user";

export const isUserProfileComplete = (user) => {
  const schema = useUserSchema();

  try {
    schema.validateSync(user, { abortEarly: false });
    return true;
  } catch (e) {
    return false;
  }
};
