import axios from 'axios';
import { httpStatusCode } from '@/api/http-status';

const { VITE_SERVER_URL } = import.meta.env;

export const serverAxios = () => {
  const instance = axios.create({
    baseURL: VITE_SERVER_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
  return instance;
};

export const instance = axios.create({
  baseURL: VITE_SERVER_URL,
  withCredentials: true
});

instance.defaults.headers.common['Authorization'] = '';
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.put['Content-Type'] = 'application/json';

instance.interceptors.request.use((config) => {
  return config;
}),
  (error) => {
    return Promise.reject(error);
  };

let isTokenRefreshing = false;

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status }
    } = error;

    if (status == httpStatusCode.UNAUTHORIZED) {
      const originalRequest = config;

      if (!isTokenRefreshing) {
        isTokenRefreshing = true;

        return await instance.post('api/v1/slient-refresh').then((response) => {
          const newAccessToken = response.data.Authorization;

          instance.defaults.headers.common['Authorization'] = newAccessToken;
          originalRequest.headers.Authorization = newAccessToken;

          isTokenRefreshing = false;

          return instance(originalRequest);
        });
      }
    } else if (status == httpStatusCode.FORBIDDEN) {
      alert(error.response.data.message);
    }

    return Promise.reject(error);
  }
);
