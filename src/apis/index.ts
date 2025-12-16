import { requestGet, reuqestPost } from "@/utils/requestHelper";
import type { AdvertisementMeta, FieldConfig } from "@/types";

// 定义通用的 API 响应结构
interface ApiResponse<T> {
  code: number;
  data: T;
  message?: string;
}

// 获取所有广告
const GET_ALL_ADS = "/ads";
export const getAllAdsApi = async (): Promise<AdvertisementMeta[]> => {
  const response = await requestGet<ApiResponse<AdvertisementMeta[]>>(
    GET_ALL_ADS
  );
  return response.data;
};

// 创建广告
const CREATE_AD = "/create_ad";
export const createApi = async (
  data: AdvertisementMeta
): Promise<AdvertisementMeta> => {
  const response = await reuqestPost<ApiResponse<AdvertisementMeta>>(
    CREATE_AD,
    data
  );
  return response.data;
};

// 编辑广告
const EDIT_AD = "/edit_ad";
export const editApi = async (
  data: AdvertisementMeta
): Promise<AdvertisementMeta> => {
  const response = await reuqestPost<ApiResponse<AdvertisementMeta>>(
    EDIT_AD,
    data
  );
  return response.data;
};

// 删除广告 (使用 POST)
const DELETE_AD = "/delete_ad";
export const deleteApi = (id: AdvertisementMeta["id"]) => {
  return reuqestPost(DELETE_AD, { id });
};

// 获取单个广告
const QUERY_AD_PREFIX = "/advertise";
export const advertiseApi = async (
  id: AdvertisementMeta["id"]
): Promise<AdvertisementMeta> => {
  const response = await requestGet<ApiResponse<AdvertisementMeta>>(
    `${QUERY_AD_PREFIX}/${id}`
  );
  return response.data;
};

// 增加点击量 (使用 POST)
const COUNTBYCLICK = "/count_click";
export const countUpApi = async (
  id: AdvertisementMeta["id"]
): Promise<AdvertisementMeta> => {
  const response = await reuqestPost<ApiResponse<AdvertisementMeta>>(
    COUNTBYCLICK,
    { id }
  );
  return response.data;
};

//上传视频
const UPLOAD_FILE = "/upload_file";
export const uploadFileApi = async (
  files: File[]
): Promise<AdvertisementMeta["videosInfo"]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("video", file);
  });
  const response = await reuqestPost<
    ApiResponse<AdvertisementMeta["videosInfo"]>
  >(UPLOAD_FILE, formData);
  return response.data;
};

//获取表单配置
const FORM_CONFIG = "form_config";
export const getFormConfig = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await requestGet<ApiResponse<FieldConfig[]>>(FORM_CONFIG);
  return response.data;
};
