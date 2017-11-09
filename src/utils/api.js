/**
 * Created by wuxiaoran on 2017/10/26.
 */
import axios from 'axios';

const api = axios.create({
  timeout: 5000,
  baseURL: 'https://www.coinfans.info/api/v1',
});

// (添加请求拦截器)
// api.interceptors.request.use(
//   (config) => {
//     //在发送请求之前做某件事
//     if (config.method === 'post') {
//       config.data = qs.stringify(config.data);
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// 返回状态判断(添加响应拦截器)
api.interceptors.response.use(
  (res) => {
    if (res.status !== 200) {
      return Promise.reject(res.msg);
    }
    return res.data.data;
  },
  error => Promise.reject(error.response.status),
);

export default api;
