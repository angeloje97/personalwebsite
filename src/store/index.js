import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import projectReducer from "./projects";
import personalReducer from "./personal";
const store = configureStore({
  reducer: {
    auth: authReducer,
    proj: projectReducer,
    personal: personalReducer,
  },
});

export default store;
