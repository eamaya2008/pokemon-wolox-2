import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { HttpClient, InitialConfiguration } from '../models/axios';

/**
 * Implementacion del la interfaz para nuestro cliente http
 */
export default class AxiosClient implements HttpClient {
  private client: AxiosInstance;

  constructor(config: InitialConfiguration) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Accept-Language': 'es',
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
      },
      withCredentials: false,
    });
  }

  public async get(url: string, parameters = {}, headers = null): Promise<any> {
    const config: AxiosRequestConfig = { params: parameters };
    if (headers != null) {
      config.headers = headers;
    }
    const response = await this.client.get(url, config);
    return response.data;
  }

  public async patch(url: string, changeSet: object, headers = null): Promise<any> {
    const config: AxiosRequestConfig = { params: changeSet };
    if (headers != null) {
      config.headers = headers;
    }
    const response = await this.client.patch(url, changeSet);
    return response.data;
  }

  public async post(url: string, data: object | string | number, parameters = {}, headers = null): Promise<any> {
    const config: AxiosRequestConfig = { params: parameters };
    if (headers != null) {
      config.headers = headers;
    }
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  public async put(url: string, payload = {}, headers = null): Promise<any> {
    let config: AxiosRequestConfig;
    if (headers != null) {
      config = { headers };
    }
    const response = await this.client.put(url, payload, config!);
    return response.data;
  }

  public async delete(url: string, headers = null): Promise<any> {
    let config: AxiosRequestConfig;
    if (headers != null) {
      config = { headers };
    }
    const response = await this.client.delete(url, config!);
    return response.data;
  }
}
