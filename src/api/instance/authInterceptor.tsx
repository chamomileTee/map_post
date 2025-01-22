import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { axiosInstance } from './index';
import { store } from '../../store/store';
import { clearAuth, setAuth } from '../../store/slices/authSlice';
import { redirectToLogin } from '../../utils/navigation';
import { setAuthToken } from '.';

export const setupAuthInterceptor = () => {
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      const newToken = response.headers['authorization'] || response.headers['Authorization'];
      if (newToken) {
        const token = newToken.startsWith('Bearer ') ? newToken : `Bearer ${newToken}`;
        setAuthToken(token);
        store.dispatch(setAuth(token));
      }
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        store.dispatch(clearAuth());
        redirectToLogin();
      }
      return Promise.reject(error);
    }
  );
};
