import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: "",
  sessionId: "",
  sessionLifeTime: "",
  timeRemaining: 0,
};

const saveState = (state) => {
  for (const prop in state) {
    localStorage.setItem(prop, state[prop]);
  }
};

const getSavedState = (state) => {
  for (const prop in state) {
    let storedValue = localStorage.getItem(prop);
    if (storedValue === "false") {
      storedValue = false;
    }
    state[prop] = storedValue;
  }
};

const calculateTimeRemaining = (state) => {
  const sessionLifeTime = new Date(state.sessionLifeTime);
  const timeRemaining = sessionLifeTime - new Date();
  state.timeRemaining = timeRemaining;
};

const logout = (state) => {
  for (const prop in state) {
    state[prop] = initialState[prop];
  }

  saveState(initialState);
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,

  reducers: {
    onStart(state) {
      getSavedState(state);
      calculateTimeRemaining(state);

      if (state.timeRemaining <= 0) {
        logout(state);
      }
    },
    login(state, action) {
      console.log(action.payload);

      for (const prop in initialState) {
        state[prop] = action.payload[prop];
      }

      state.isAuthenticated = true;
      calculateTimeRemaining(state);
      saveState(state);
    },
    logout(state) {
      logout(state);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
