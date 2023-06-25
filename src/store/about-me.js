import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  selectedFilesId: [],
  loading: false,
  editing: false,
  removing: false,
  sendingFetch: false,

  editingFile: false,
  editingFileIndex: -1,
  editingFileName: false,
  editingFileNames: false,

  currentFile: {},
  editingCurrentFile: false,
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

    setSelectFile(state, action) {
      const { _id: fileId } = action.payload.file;
      const { selected } = action.payload;

      console.log(fileId, selected);

      if (selected) {
        if (state.selectedFilesId.includes(fileId)) return;
        state.selectedFilesId = [...state.selectedFilesId, fileId];
      } else {
        state.selectedFilesId = state.selectedFilesId.filter(
          (id) => id !== fileId
        );
      }
    },

    selectFile(state, action) {
      const { _id: fileId } = action.payload.file;
      if (state.selectedFilesId.includes(fileId)) return;
      state.selectedFilesId = [...state.selectedFilesId, fileId];
    },
  },
});

export const aboutMeActions = aboutMeSlice.actions;

export default aboutMeSlice.reducer;
