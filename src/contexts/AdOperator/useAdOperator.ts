import { useContext } from "react";
import AdOperatorContext from "./AdOperatorContext";


export const useAdOperator = () => {
  const context = useContext(AdOperatorContext);
  if (!context) {
    throw new Error("useAdOperator must be used within AdOperatorProvider");
  }
  return context;
};