import aboutMe, { aboutMeActions } from "./about-me";

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

export const addFile = (newFile, currentFiles, sessionId) => {
  return async (dispatch) => {
    try {
      newFile.created = new Date();
      newFile.updated = new Date();
      const response = await fetch("/api/about-me/new", {
        method: "POST",
        body: JSON.stringify({
          sessionId,
          newFile,
        }),
        "Content-Type": "Application/json",
      });

      const data = await response.json();
      newFile._id = data.body.newFile.insertedId;
      newFile.created = `${newFile.created}`;
      newFile.updated = `${newFile.updated}`;

      if (currentFiles) {
        dispatch(
          aboutMeActions.update({
            files: [newFile, ...currentFiles],
          })
        );

        dispatch(
          aboutMeActions.update({
            editingFile: false,
            editingFileIndex: -1,
          })
        );
      }
    } catch (error) {}
  };
};
