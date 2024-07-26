import { useUserSchema } from "./schemas/user";

export const useSchema = () => {
  return { user: useUserSchema() };
};
