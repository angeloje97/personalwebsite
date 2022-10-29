import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import projectReducer from "./projects";
import personalReducer from "./personal";
import aboutMeReducer from "./about-me";

const store = configureStore({
  reducer: {
    auth: authReducer,
    proj: projectReducer,
    personal: personalReducer,
    aboutMe: aboutMeReducer,
  },
});

export default store;
