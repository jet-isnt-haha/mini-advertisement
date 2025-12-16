import { getFormConfig } from "@/apis";
import type { AdvertisementMeta, FieldConfig } from "@/types";
import { getCachedFormConfig } from "@/utils/cacheHelper";
import { useRequest } from "ahooks";

interface useFormConfigOptions {
  initialValues: AdvertisementMeta | undefined;
}

const parseRegexString = (regexStr: string): RegExp | null => {
  try {
    const match = regexStr.match(/^\/(.*?)\/([a-z]*)$/);
    if (match) {
      return new RegExp(match[1], match[2]);
    } else {
      return new RegExp(regexStr);
    }
  } catch (e) {
    console.error("Invalid regex format:", regexStr, e);
    return null;
  }
};

const processRules = (config: FieldConfig[]): FieldConfig[] => {
  return config.map((field) => {
    if (!field.rules) return field;

    const processedRules = field.rules.map((rule) => {
      // 检查 rule.match 是否为字符串
      if (rule.match && typeof rule.match === "string") {
        const regex = parseRegexString(rule.match);
        if (regex) {
          return {
            ...rule,
            match: regex, // 直接覆盖为 RegExp 对象
          };
        }
      }
      return rule;
    });

    return { ...field, rules: processedRules };
  });
};

export const useFormConfig = (options: useFormConfigOptions) => {
  const { initialValues } = options;
  const { data: config = undefined, loading } = useRequest(
    async () => {
      const rawConfig = initialValues
        ? getCachedFormConfig(initialValues.sourceId || initialValues.id)
        : await getFormConfig();
      return {
        rawConfig,
        processedConfig: processRules(rawConfig),
      };
    },
    {
      refreshDeps: [initialValues?.id],
      cacheKey: initialValues?.id
        ? `form-config-${initialValues.id}`
        : "form-config-new",
    }
  );
  if (config == undefined) {
    return { config: undefined };
  }
  return {
    config: config.processedConfig,
    rawConfig: config.rawConfig,
    loading,
  };
};
