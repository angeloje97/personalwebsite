import { aboutMeActions } from "./about-me";

export const onStartAboutMe = () => {
  return (dispatch) => {
    dispatch(loadFiles());
  };
};

export const loadFiles = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("/api/about-me");

      const data = await response.json();

      dispatch(aboutMeActions.update({ files: data.body.files }));
    } catch (error) {
      console.log(error.message);
    }
  };
};
