import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  linkedIn: {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/angelo-esmeralda-60561b235/",
    icon: "Linkedin.png",
  },
  gitHub: {
    name: "Github",
    url: "https://github.com/angeloje97",
    icon: "Github.png",
  },
  email: { name: "Email", url: "angeloje97@outlook.com" },
  resume: {
    name: "Resume",
    url: "/resources/resumes/Resume2023_1.pdf",
    icon: "Resume.png",
  },
};

const personalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {},
});

export const personalActions = personalSlice.actions;

export default personalSlice.reducer;
