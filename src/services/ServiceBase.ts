import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
import queryString from "querystring";
import { API } from "../constants/API";

export interface ProcessingResult<T> {
  result: T;
  errors: {
    code: string;
    message: string;
    innerError?: unknown;
  }[];
}

const api: AxiosInstance = axios.create({
  baseURL: API.MESSENGER_API,
  timeout: 300 * 1000,
});

api.defaults.headers.common = {
  "Content-Type": "application/json; charset=utf-8",
};

api.interceptors.response.use(
  (response): AxiosPromise<ProcessingResult<any>> => {
    return Promise.resolve(response);
  },
  (error): AxiosPromise<ProcessingResult<any>> => {
    return Promise.reject(error);
  }
);

export abstract class ServiceBase {
  protected static BASE_URL: string;

  protected static BASE_DOMAIN: string;

  protected static VersionAPI: string = "v1";

  protected static serviceApi = api;

  public static setAuthToken(token: string) {
    this.serviceApi.defaults.headers.common = {
      ...this.serviceApi.defaults.headers.common,
      Authorization: `bearer ${token}`,
    };
  }

  public static buildUrl(url: string) {
    if (this.BASE_DOMAIN)
      return `${this.BASE_DOMAIN}${this.VersionAPI}${this.BASE_URL}${url}`;
    return `${this.BASE_URL}${url}`;
  }

  protected static get<T>(
    url: string,
    data?: Nullable<any>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    let newUrl: string = url;

    if (data && Object.keys(data).length) {
      newUrl = `${newUrl}?${queryString.stringify(data)}`;
    }

    return this.serviceApi.get(this.buildUrl(newUrl), options);
  }

  protected static post<T>(
    url: string,
    data?: Nullable<object>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.serviceApi.post(this.buildUrl(url), data, options);
  }

  protected static put<T>(
    url: string,
    data?: Nullable<object>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.serviceApi.put(this.buildUrl(url), data, options);
  }

  protected static patch<T>(
    url: string,
    data?: Nullable<object>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.serviceApi.patch(this.buildUrl(url), data, options);
  }

  protected static delete<T>(
    url: string,
    data?: Nullable<any>,
    options?: AxiosRequestConfig,
    disableURLExtends?: boolean
  ): AxiosPromise<T> {
    let newUrl: string = url;

    if (data && !disableURLExtends) {
      newUrl = `${newUrl}?${queryString.stringify(data)}`;
      return this.serviceApi.delete(this.buildUrl(newUrl), options);
    }

    return this.serviceApi.delete(this.buildUrl(newUrl), { ...options, data });
  }
}
