import { AxiosError } from 'axios';
import { axiosInstance } from './index';
import { store } from '../../store/store';
import { clearAuth } from '../../store/slices/authSlice';
import { redirectToLogin } from '../../utils/navigation';

export const setupAuthErrorInterceptor = () => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        store.dispatch(clearAuth());
        redirectToLogin();
      }
      return Promise.reject(error);
    }
  );
};