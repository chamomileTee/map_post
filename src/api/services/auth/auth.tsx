import { axiosInstance, setAuthToken } from '../../instance';

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post('/api/auth/login', { email, password });
  const accessToken = response.headers['authorization'] || response.headers['Authorization'];
  if (accessToken) {
    const token = accessToken.startsWith('Bearer ') ? accessToken : `Bearer ${accessToken}`;
    setAuthToken(token);
  }
  return { ...response.data, token: accessToken };
};

export const logout = async () => {
  const response = await axiosInstance.post('/api/auth/logout');
  return response.data;
};

export const refreshToken = async () => {
  const response = await axiosInstance.post('/api/auth/refresh');
  const newToken = response.data.token;
  setAuthToken(newToken);
  return newToken;
};