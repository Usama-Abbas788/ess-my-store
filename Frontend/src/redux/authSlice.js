import { createSlice } from "@reduxjs/toolkit";

const getInitialUsers = () => {
  const savedUsers = localStorage.getItem("users");

  return savedUsers ? JSON.parse(savedUsers) : [];
};
const getInitialCurrentUser = () => {
  const savedUser = localStorage.getItem("currentUser");

  return savedUser ? JSON.parse(savedUser) : null;
};
const initialState = {
  users: getInitialUsers(),
  currentUser: getInitialCurrentUser(),
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    logout: (state) => {
      state.currentUser = null;
    },
  },
});
export const {
  addUser,
  setCurrentUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;