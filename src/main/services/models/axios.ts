/**
 * This is a generic interface that is used by all REST services implemented. Using this generic
 * interface allows us to change the implementation of the rest client (e.g: by changing the rest
 * client library) without having to change the code in the services implemented.
 */
export interface HttpClient {
  /**
   * Http GET request
   *
   * @param url Url where we do the request
   * @param parameters Request parameters
   * @param headers Headers to use, if null or undefined common Authentication will be injected.
   */
  get(url: string, parameters?: any, headers?: any): Promise<any>;

  patch(url: string, changeSet?: any, headers?: any): Promise<any>;

  post(url: string, entity: string, parameters?: any, headers?: any): Promise<any>;

  put(url: string, payload: any, headers?: any): Promise<any>;

  delete(url: string, headers?: any): Promise<any>;
}

// Base url where we are going to do the requests.
export interface InitialConfiguration {
  baseUrl: string;
}
