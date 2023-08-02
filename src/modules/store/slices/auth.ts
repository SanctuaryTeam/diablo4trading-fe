// src/redux/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api.service';
import { API } from '@sanctuaryteam/shared';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: API.User;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: '',
  user: null, // Store user information here
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    authLogout: (state) => {
      state.token = ''; 
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('jwtToken');      
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.discordAuthCallback.matchFulfilled, (state, action) => {
      state.token = action.payload.token;      
      localStorage.setItem('jwtToken', state.token);
    })
    .addMatcher(api.endpoints.fetchUserInfo.matchFulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addMatcher(api.endpoints.fetchUserInfo.matchRejected, (state, _) => {
      state.token = ''; 
      state.isAuthenticated = false;    
      localStorage.removeItem('jwtToken');
    })
  }
});

export const { setAuthToken, authLogout } = authSlice.actions;
export default authSlice.reducer;
