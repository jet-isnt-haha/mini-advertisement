import { getFormConfig } from "@/apis";
import type { FieldConfig } from "@/types";
import { useRequest } from "ahooks";

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
      if (rule.match && typeof rule.match === 'string') {
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
export const useFormConfig = () => {
  const { data: config = undefined, loading } = useRequest(async () => {
    const config = await getFormConfig();
    return processRules(config.fields);
  });
  if (config == undefined) {
    return { config: undefined };
  }
  return {
    config,
    loading,
  };
};
