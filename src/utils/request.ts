import request, { ResponseError } from 'umi-request';

import type { RequestOptionsInit } from 'umi-request';

const whiteList = [
  '/api/user/permission'
]

const customRequest = async <T extends RequestData>(
  url: string,
  method: 'post' | 'get',
  params: Record<string, any>,
  options: RequestOptionsInit = {},
): Promise<T> => {
  let options_: RequestOptionsInit = {
    method,
    headers: {
      TOKEN: localStorage.getItem('TOKEN') || ''
    },
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
  try {
    const res = await request<T>(url, options_);
    if (res.code === 200) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  } catch (error) {
    const error_ = error as ResponseError
    const response = error_.response
    if (response.status === 403) {
      if (!whiteList.includes(url)) {
        location.href = '/login'
      }
    }
    return Promise.reject(error);
  }
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
