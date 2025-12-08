import type { AdvertisementMeta } from "@/types";
import type { FieldConfig } from "@/types/form";
import { useMemo } from "react";
import {
  createDefaultProcessor,
  ProcessorMap,
} from "../utils/adProcessors";
import { createPipeline } from "@/utils/processorHelper";
import type { AdFormValues } from "../type";

interface Options {
  initialValues: AdvertisementMeta | undefined;
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
    return createPipeline<Partial<AdFormValues>, FieldConfig[]>(...processors, defaultProcessor);
  }, [fieldConfig, initialValues]);

  const processFormData = async (values: Partial<AdFormValues>) => {
    if (!formProcessor) {
      return values as AdvertisementMeta;
    }

    return await formProcessor(values, fieldConfig) as AdvertisementMeta;
  };

  return { processFormData };
};
