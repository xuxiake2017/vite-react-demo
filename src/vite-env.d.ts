/// <reference types="vite/client" />

interface RequestData<T = any> {
  code: number;
  data: T;
  message: string;
}
