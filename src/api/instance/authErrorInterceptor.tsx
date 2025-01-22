import { AxiosError, AxiosRequestConfig } from 'axios';
import { axiosInstance } from './index';
import { store } from '../../store/store';
import { clearAuth } from '../../store/slices/authSlice';
import { redirectToLogin } from '../../utils/navigation';
import { refreshToken } from '../services/auth/auth';
import { setAuthToken } from '../instance'
import { setAuth } from '../../store/slices/authSlice'

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.map(cb => cb(token));
};

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  headers: Record<string, string>;
}

export const setupAuthErrorInterceptor = () => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as ExtendedAxiosRequestConfig;
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              resolve(axiosInstance(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refreshToken();
          setAuthToken(newToken);
          store.dispatch(setAuth(newToken));
          onRefreshed(newToken);
          originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          store.dispatch(clearAuth());
          redirectToLogin();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
          refreshSubscribers = [];
        }
      }
      return Promise.reject(error);
    }
  );
};