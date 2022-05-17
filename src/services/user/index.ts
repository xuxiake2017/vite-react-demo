import { get, postJSON } from '@/utils/request';

import type { LoginParams, UserInfo } from './model';

export const getUserPermission = () => {
  return get<RequestData<string[]>>('/api/user/permission')
}

export const login = (params: LoginParams) => {
  return postJSON<RequestData<{ token: string }>>('/api/user/login', params)
}

export const getUserInfo = () => {
  return get<RequestData<UserInfo>>('/api/user/getUserInfo')
}

export const logout = () => {
  return get<RequestData>('/api/user/logout')
}