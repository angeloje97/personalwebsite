import aboutMe, { aboutMeActions } from "./about-me";

export const onStartAboutMe = () => {
  return (dispatch) => {
    dispatch(loadFiles());
  };
};

export const loadFiles = () => {
  return async (dispatch) => {
    dispatch(aboutMeActions.update({ loading: true }));
    try {
      const response = await fetch("/api/about-me");

      const data = await response.json();

      dispatch(aboutMeActions.update({ files: data.body.files }));
    } catch (error) {
      console.log(error.message);
    }

    dispatch(aboutMeActions.update({ loading: false }));
  };
};

export const removeFiles = (fileIds, currentFiles, sessionId) => {
  return async (dispatch) => {
    console.log(fileIds, currentFiles);
    const response = await fetch("/api/about-me/remove-many", {
      method: "DELETE",
      body: JSON.stringify({
        fileIds,
        sessionId,
      }),
      "Content-Type": "Application/json",
    });

    const data = await response.json();

    console.log(data);

    if (data.body && data.body.deletedCount) {
      dispatch(
        aboutMeActions.update({
          files: currentFiles.filter((file) => !fileIds.includes(file._id)),
          removing: false,
          selectedFileIds: [],
        })
      );
    }
  };
};

export const updateFile = (updatedFile, currentFiles, sessionId) => {
  return async (dispatch) => {
    try {
      updatedFile.updated = new Date();

      const response = await fetch("/api/about-me/update", {
        method: "PUT",
        body: JSON.stringify({
          sessionId,
          updatedFile,
        }),
        "Content-Type": "Application/json",
      });

      updatedFile.update = `${updatedFile.updated}`;

      const newFiles = [];

      for (let i = 0; i < currentFiles.length; i++) {
        if (currentFiles[i]._id === updatedFile._id) {
          newFiles.push(updatedFile);
        } else {
          newFiles.push(currentFiles[i]);
        }
      }

      dispatch(
        aboutMeActions.update({
          files: newFiles,
          editingFile: false,
          editingFileIndex: -1,
        })
      );
    } catch (error) {}
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
            editingFileName: false,
            editingFileIndex: -1,
          })
        );
      }
    } catch (error) {}
  };
};
