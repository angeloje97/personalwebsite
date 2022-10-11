import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  selectedProjectIds: [],
  loading: false,

  removing: false,
  editing: false,
  creatingNew: false,
  newProject: {},
};

const projectSlice = createSlice({
  name: "proj",
  initialState: initialState,
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload.projects;
    },

    updateLoading(state, action) {
      state.loading = action.payload.loading;
    },

    projectIdSelect(state, action) {
      const projectId = action.payload.projectId;
      const add = action.payload.add;

      if (add) {
        if (state.selectedProjectIds.includes(projectId)) return;
        state.selectedProjectIds = [...state.selectedProjectIds, projectId];
      } else {
        if (!state.selectedProjectIds.includes(projectId)) return;
        state.selectedProjectIds = state.selectedProjectIds.filter(
          (id) => id !== projectId
        );
      }
    },

    clearSelectedIds(state) {
      state.selectedProjectIds = [];
    },
    setRemoveProjects(state, action) {
      state.removing = action.payload.removing;
    },

    setCreatingNewProject(state, action) {
      state.creatingNew = action.payload.createNew;
    },

    setEditing(state, action) {
      state.editing = action.payload.editing;
    },
  },
});

export const projActions = projectSlice.actions;
export default projectSlice.reducer;
