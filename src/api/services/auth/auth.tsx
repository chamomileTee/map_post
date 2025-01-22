import { axiosInstance } from '../../instance';

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post('/api/auth/login', { email, password });
  return { token: response.data.token, ...response.data };
};
export const logout = async () => {
  const response = await axiosInstance.post('/api/auth/logout');
  return response.data;
};