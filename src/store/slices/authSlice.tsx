import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAuthToken, clearAuthToken } from '../../api/instance';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      setAuthToken(action.payload);
      localStorage.setItem('authToken', action.payload);
    },
    clearAuth: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      clearAuthToken();
      localStorage.removeItem('authToken');
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;