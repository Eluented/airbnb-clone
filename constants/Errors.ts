import { Alert } from "react-native";
import { isClerkAPIResponseError } from "@clerk/clerk-expo";

export const defaultClerkAPIError = (err: any) => {
  console.log("error", JSON.stringify(err, null, 2));
  if (isClerkAPIResponseError(err)) {
    Alert.alert("Error", err.errors[0].message);
  }
};