import { uploadFileApi } from "@/apis";
import type { advertisementMeta } from "@/types";
import type { FieldConfig, FieldType } from "@/types/form";
import { uploadFileHelper } from "@/utils/uploadFileHelper";
import type { UploadItem } from "@arco-design/web-react/es/Upload";

//数据处理器接收数据返回处理后的数据
export type Processor = (
  values: Record<string, any>,
  config: FieldConfig[]
) => Record<string, any> | Promise<Record<string, any>>;

export const uploadProcessor: Processor = async (values, config) => {
  const result = { ...values };

  const uploadFields = config.filter((field) => field.type === "upload");

  for (const field of uploadFields) {
    const files = values[field.name] as UploadItem[];
    if (!files || !Array.isArray(files)) continue;
    result[field.name] = await washVideoFile(files);
  }

  return result;
};

export const createDefaultProcessor = (
  initialValues?: Record<string, any>
): Processor => {
  return (value) => {
    return {
      ...value,
      id: initialValues?.id || Date.now().toString(),
      clickCount: initialValues?.clickCount || 0,
    };
  };
};

export const createPipeline = (...processors: Processor[]): Processor => {
  return async (values, config) => {
    const adData = processors.reduce(
      async (result, processor) => await processor(result, config),
      values
    );
    return adData;
  };
};

const washVideoFile = async (files: UploadItem[]) => {
  const results: advertisementMeta["videosInfo"][] = [];

  for (const file of files) {
    if (file.originFile) {
      //新上传文件批处理
      const result = await uploadFileHelper(file.originFile, uploadFileApi);
      if (result) results.push(result);
    } else if (file.url && file.uid && file.name) {
      const videoInfo = { url: file.url, name: file.name, uid: file.uid };
      results.push([videoInfo]);
    }
  }

  return results.flat();
};

export const ProcessorMap: Record<FieldType, Processor | null> = {
  upload: uploadProcessor,
  input: null,
  text_area: null,
  input_number: null,
};
