import { uploadFileApi } from "@/apis";
import type { AdvertisementMeta } from "@/types";
import type { FieldConfig, FieldType } from "@/types/form";
import type { Processor } from "@/utils/processorHelper";
import { uploadFileHelper } from "@/utils/uploadFileHelper";
import type { UploadItem } from "@arco-design/web-react/es/Upload";
import type { AdFormValues } from "../type";
import Storage from "@/utils/storageHelper";

//数据处理器接收数据返回处理后的数据
export type AdFormProcessor = Processor<
  Partial<AdFormValues & Record<string, unknown>>,
  FieldConfig[]
>;

export const uploadProcessor: AdFormProcessor = async (values, config) => {
  if (config === undefined) return values;
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
  initialValues?: AdvertisementMeta
): AdFormProcessor => {
  //对于复制的情况,从localStorage获取新id
  const newId = Storage.getItem<string>("tmp_new_id");
  Storage.removeItem("tmp_new_id");
  return (value) => {
    return {
      ...value,
      sourceId: initialValues?.id,
      id: newId || initialValues?.id || Date.now().toString(),
      clickCount: initialValues?.clickCount || 0,
    };
  };
};

const washVideoFile = async (files: UploadItem[]) => {
  const results: AdvertisementMeta["videosInfo"][] = [];

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

export const ProcessorMap: Record<FieldType, AdFormProcessor | null> = {
  upload: uploadProcessor,
  input: null,
  text_area: null,
  input_number: null,
};
