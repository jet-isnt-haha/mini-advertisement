import type { advertisementMeta } from "@/types";
import type { FieldConfig } from "@/types/form";
import { useMemo } from "react";
import {
  createDefaultProcessor,
  createPipeline,
  ProcessorMap,
} from "../utils/formHandler";

interface Options {
  initialValues: advertisementMeta | undefined;
  fieldConfig: FieldConfig[];
}

//根据表单配置动态生成对应的处理器
export const useFormProcessor = ({ initialValues, fieldConfig }: Options) => {
  const formProcessor = useMemo(() => {
    //拉取的配置是空数组或暂未拉取下来就return null
    if (!fieldConfig || fieldConfig.length === 0) {
      return null;
    }
    const processors = [];
    //获取默认处理器
    const defaultProcessor = createDefaultProcessor(initialValues);

    for (const field of fieldConfig) {
      const { type } = field;
      const processor = ProcessorMap[type];
      if (processor) {
        processors.push(processor);
      }
    }

    return createPipeline(...processors, defaultProcessor);
  }, [fieldConfig, initialValues]);

  const processFormData = async (values) => {
    if (!formProcessor) {
      return values;
    }

    return await formProcessor(values, fieldConfig);
  };

  return { processFormData };
};
