import { useFields } from "../hooks/useFields";
import { useDefaultValues } from "../hooks/useDefaultValues";

export const getDefaults = (user, endpoint) => {
  const fields = useFields();
  //console.log("fields", fields[endpoint]);

  const defaultValues = useDefaultValues(user, fields[endpoint]);
  return defaultValues;
};
