import { get } from '@/utils/request';

export const getUserPermission = () => {
  return get<RequestData<string[]>>('/api/user/permission')
}