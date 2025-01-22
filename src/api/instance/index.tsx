import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('authToken', token);
};

export const clearAuthToken = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
  localStorage.removeItem('authToken');
};

const token = localStorage.getItem('authToken');
if (token) {
  setAuthToken(token);
}
