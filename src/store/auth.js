import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: "",
  sessionId: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      console.log(action.payload);
      state.isAuthenticated = true;
      state.sessionId = action.payload.sessionId;
      state.username = action.payload.username;

      localStorage.setItem("sessionId", action.payload.sessionId);
      localStorage.setItem("username", action.payload.username);
    },
    logout(state) {
      for (const prop in state) {
        state[prop] = initialState[prop];
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
