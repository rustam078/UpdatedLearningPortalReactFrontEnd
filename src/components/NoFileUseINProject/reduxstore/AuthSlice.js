import { createSlice } from '@reduxjs/toolkit'
const initialAuthState={
    firstname:"",
    emaill:"",
    isAuthenticated:false
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login: (state,action) => {
      state.firstname=action.payload.firstname;
      state.emaill=action.payload.emaill;
      state.isAuthenticated=action.payload.isAuthenticated;
    },
    logout: state => {
      state.isAuthenticated=false
    }
  }
})

export const { login, logout } = authSlice.actions //here we are already distructing

export default authSlice;
