import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAuthToken, clearAuthToken } from '../../api/instance';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      setAuthToken(action.payload);
    },
    clearAuth: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      clearAuthToken();
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;