import axios from "axios";

// use only in service
export const _get = (pathUrl: string) => {
  return axios.get(pathUrl);
}