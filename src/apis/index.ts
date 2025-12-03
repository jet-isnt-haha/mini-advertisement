import { requestGet, reuqestPost } from "@/utils/requestHelper";
import type { advertisementMeta } from "@/types";

// 定义通用的 API 响应结构
interface ApiResponse<T> {
  code: number;
  data: T;
  message?: string;
}

// 获取所有广告
const GET_ALL_ADS = "/ads";
export const getAllAdsApi = async (): Promise<advertisementMeta[]> => {
  const response = await requestGet<ApiResponse<advertisementMeta[]>>(
    GET_ALL_ADS
  );
  console.log(response);
  return response.data;
};

// 创建广告
const CREATE_AD = "/create_ad";
export const createApi = async (data: any): Promise<advertisementMeta> => {
  const response = await reuqestPost<ApiResponse<advertisementMeta>>(
    CREATE_AD,
    data
  );
  return response.data;
};

// 编辑广告
const EDIT_AD = "/edit_ad";
export const editApi = async (data: any): Promise<advertisementMeta> => {
  const response = await reuqestPost<ApiResponse<advertisementMeta>>(
    EDIT_AD,
    data
  );
  return response.data;
};

// 删除广告 (使用 POST)
const DELETE_AD = "/delete_ad";
export const deleteApi = (id: advertisementMeta["id"]) => {
  return reuqestPost(DELETE_AD, { id });
};

// 获取单个广告
const QUERY_AD_PREFIX = "/advertise";
export const advertiseApi = async (
  id: advertisementMeta["id"]
): Promise<advertisementMeta> => {
  const response = await requestGet<ApiResponse<advertisementMeta>>(
    `${QUERY_AD_PREFIX}/${id}`
  );
  return response.data;
};

// 增加点击量 (使用 POST)
const COUNTBYCLICK = "/count_click";
export const countUpApi = async (data: {
  id: string;
}): Promise<advertisementMeta> => {
  const response = await reuqestPost<ApiResponse<advertisementMeta>>(
    COUNTBYCLICK,
    data
  );
  return response.data;
};
