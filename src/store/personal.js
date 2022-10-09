import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  linkedIn: "https://www.linkedin.com/in/angelo-esmeralda-60561b235/",
  gitHub: "https://github.com/angeloje97",
  email: "angeloje97@outlook.com",
};

const personalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {},
});

export const personalActions = personalSlice.actions;

export default personalSlice.reducer;
