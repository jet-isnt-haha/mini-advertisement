import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const request: AxiosInstance = axios.create({
  baseURL: "/v1/api",
  timeout: 10000,
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
