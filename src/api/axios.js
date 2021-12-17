import axios from "axios";
import { Message } from "iview";
let router =
  import("@/router");

axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers["Cache-Control"] = "no-cache";
axios.defaults.headers["pragma"] = "no-cache";



export function post(url, data, otherConfig) {
  return axios.post(url, data, otherConfig);
}
export function put(url, data, otherConfig) {
  return axios.put(url, data, otherConfig);
}
export function del(url, data, otherConfig) {
  return axios.delete(url, data, otherConfig);
}
export function get(url, data, otherConfig) {
  return axios.get(url, {
    params: data,
    ...otherConfig
  });
}