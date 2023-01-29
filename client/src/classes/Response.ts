import type { AxiosResponse } from "axios";

export interface Response<T> extends AxiosResponse {
  data: T;
}
