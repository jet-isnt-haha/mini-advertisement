import { getFormConfig } from "@/apis";
import { useRequest } from "ahooks";

export const useFormConfig = () => {
  const { data: config = undefined, loading } = useRequest(async () => {
    return await getFormConfig();
  });
  if (config == undefined) {
    return { config: undefined };
  }
  return {
    config: config.fields,
    loading,
  };
};
