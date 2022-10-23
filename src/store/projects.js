import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  selectedProjectIds: [],

  loading: false,
  removing: false,
  editing: false,
  creatingNew: false,
  editingSection: false,
  editingContent: false,
  editingBlog: false,

  routingData: {
    name: "",
    sectionIndex: "",
    contentIndex: "",
  },

  editingSectionIndex: -1,
  editingContentIndex: -1,
  editingBlogIndex: -1,
  currentProject: null,
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

    setCurrentProject(state, action) {
      state.currentProject = action.payload.project;
    },

    updateCurrentProjectContent(state, action) {
      const { newContents, sectionIndex } = action.payload;
      console.log(newContents);
      state.currentProject.sections[sectionIndex].contents = newContents;

      state.currentProject.sections[sectionIndex].updated = `${new Date()}`;
    },

    removeContent(state, action) {
      const { sectionIndex, contentIndex } = action.payload;
      state.currentProject.sections[sectionIndex].contents =
        state.currentProject.sections[sectionIndex].contents.filter(
          (content, index) => index !== contentIndex
        );
    },

    revertCurrentProjectChanges(state) {
      if (!state.currentProject) return;
      var id = state.currentProject._id;
      const project = state.projects.find((proj) => proj._id === id);

      if (project) {
        state.currentProject = { ...project };
      }
    },

    update(state, action) {
      for (const prop in action.payload) {
        if (!state[prop] === undefined) {
          throw new Error("Cannot add property to update");
        }
        state[prop] = action.payload[prop];
      }
    },

    resetEditor(state) {
      const newFlags = {
        editing: false,
        removing: false,
        creatingNew: false,
      };

      for (const prop in newFlags) {
        state[prop] = newFlags[prop];
      }
    },
  },
});

export const projActions = projectSlice.actions;
export default projectSlice.reducer;
