import request from 'umi-request';

import type { RequestOptionsInit } from 'umi-request';

const customRequest = async <T extends RequestData>(
  url: string,
  method: 'post' | 'get',
  params: Record<string, any>,
  options: RequestOptionsInit = {},
): Promise<T> => {
  let options_: RequestOptionsInit = {
    method,
    ...options,
  };
  if (method === 'get') {
    options_ = {
      ...options_,
      params,
    };
  } else {
    options_ = {
      ...options_,
      data: {
        ...params,
      },
    };
  }
  const res = await request<T>(url, options_);
  return new Promise((resolve, reject) => {
    if (res.code === 200) {
      resolve(res);
    } else {
      reject(res);
    }
  });
};

export const post = async <T extends RequestData>(
  url: string,
  params: Record<string, any> = {},
): Promise<T> => {
  return customRequest<T>(url, 'post', params, {
    requestType: 'form',
  });
};

export const postJSON = async <T extends RequestData>(
  url: string,
  params: Record<string, any> = {},
): Promise<T> => {
  return customRequest<T>(url, 'post', params);
};

export const get = async <T extends RequestData>(
  url: string,
  params: Record<string, any> = {},
): Promise<T> => {
  return customRequest<T>(url, 'get', params);
};

export default customRequest;
