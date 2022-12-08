import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AboutMeEditor from "../../src/components/about-me/AboutMeEditor";
import FileForm from "../../src/components/about-me/FileForm";
import Tabs from "../../src/components/about-me/Tabs";
import ProgressBar from "../../src/components/elements/ProgressBar";
import { aboutMeActions } from "../../src/store/about-me";
import File from "../../src/components/about-me/File";
import Loading from "../../src/components/elements/Loading";

const AboutMe = () => {
  // const tabs = ["General", "Skills", "Hobbies", "Interests"];
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const files = useSelector((state) => state.aboutMe.files);
  const editingFileName = useSelector((state) => state.aboutMe.editingFileName);
  const loading = useSelector((state) => state.aboutMe.loading);

  if (loading) {
    return <Loading />;
  }

  const handleChangeTab = (selectedFile) => {
    dispatch(
      aboutMeActions.update({
        currentFile: { ...selectedFile },
      })
    );
  };

  return (
    <React.Fragment>
      <Tabs files={files} onChangeTab={handleChangeTab} />
      <File />
      {isAuthenticated && <AboutMeEditor />}
      {editingFileName && <FileForm />}
    </React.Fragment>
  );
};

export default AboutMe;
