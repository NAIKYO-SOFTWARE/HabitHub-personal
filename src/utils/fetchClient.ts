import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import auth from "./auth";

export type RequestConfig = AxiosRequestConfig;

export const cancelToken = () => axios.CancelToken.source();

const reqErrorInterceptor = (error: any) => {
  axios.get("");
  return Promise.reject(error);
};

const resInterceptor = (response: any) => response;

const resErrorInterceptor = (error: {
  response: { status: number; request: XMLHttpRequest };
}) => {
  // whatever you want to do with the error
  if (
    error?.response?.status === 401 &&
    !/sign-in/.test(error.response.request.responseURL)
  ) {
    auth.clearToken();
    window.location.href = "/auth/login?redirectUrl=" + location.pathname;
  }

  throw error;
};

const addInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use((v) => {
    v.headers.setAuthorization(`Bearer ${auth.getToken()}`);
    return v;
  }, reqErrorInterceptor);

  instance.interceptors.response.use(resInterceptor, resErrorInterceptor);
};

export const fetchClient = () => {
  const instance = axios.create({
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  addInterceptors(instance);

  return instance;
};

const addPrependingSlash = (url: string) =>
  typeof url === "string" && url.charAt(0) !== "/" ? `/${url}` : url;

//This regular expression matches a string that starts with either "http://" or "https://" or any other protocol name in lower case letters, followed by "://" and ends with anything else
const hasProtocol = (url: string) =>
  new RegExp("^(?:[a-z+]+:)?//", "i").test(url);

const normalizeUrl = (url: string) =>
  hasProtocol(url) ? url : addPrependingSlash(url);

const getFetchClient = (defaultOptions = {}) => {
  const instance = fetchClient();
  instance.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  return {
    get: (url: string, config?: RequestConfig) =>
      instance.get(normalizeUrl(url), { ...defaultOptions, ...config }),
    put: (url: string, data?: unknown, config?: RequestConfig) =>
      instance.put(normalizeUrl(url), data, { ...defaultOptions, ...config }),
    patch: (url: string, data?: unknown, config?: RequestConfig) =>
      instance.patch(normalizeUrl(url), data, { ...defaultOptions, ...config }),
    post: (url: string, data?: unknown, config?: RequestConfig) =>
      instance.post(normalizeUrl(url), data, { ...defaultOptions, ...config }),
    del: (url: string, config?: RequestConfig) =>
      instance.delete(normalizeUrl(url), { ...defaultOptions, ...config }),
  };
};

export default getFetchClient;
