import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  ads: `${API_BASE_URL}/v1/api/ads`,
  upload: `${API_BASE_URL}/v1/api/upload`,
};

const request: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/v1/api/`,
  timeout: 10000,
  withCredentials: true,
});
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

request.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
});

export const requestGet = <T>(url: string, params?: unknown): Promise<T> => {
  return request.get(url, { params });
};

export const reuqestPost = <T>(url: string, data?: unknown): Promise<T> => {
  return request.post(url, data);
};

export default request;
