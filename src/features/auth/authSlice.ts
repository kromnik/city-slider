import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuth: boolean;
  username: string | null;
  password: string | null;
}

interface LoginPayload {
  username: string;
  password: string;
}

const initialState: AuthState = {
  isAuth: false,
  username: null,
  password: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.isAuth = true;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    logout(state) {
      state.isAuth = false;
      state.username = null;
      state.password = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;