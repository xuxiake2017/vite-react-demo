import { get } from '@/utils/request';

export const test1 = () => {
  return get<RequestData<number>>('/api/demo/test1')
}