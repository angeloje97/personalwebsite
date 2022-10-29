import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  loading: false,
  editing: false,

  editingFile: false,
  editingFileIndex: -1,
};

const aboutMeSlice = createSlice({
  name: "aboutMe",
  initialState,
  reducers: {
    update(state, action) {
      for (const property in action.payload) {
        if (typeof state[property] === "undefined") {
          console.log(property, "not found");
          continue;
        }
        state[property] = action.payload[property];
      }
    },

    insert(state, action) {
      for (const property in action.payload) {
        if (state[property]) continue;
        state[property] = action.payload[property];
      }
    },
  },
});

export const aboutMeActions = aboutMeSlice.actions;

export default aboutMeSlice.reducer;
