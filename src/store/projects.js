import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "proj",
  initialState: initialState,
  reducers: {
    setProjects(action, state) {},
  },
});

export const projectActions = projectSlice.actions;
export default projectSlice.reducer;
