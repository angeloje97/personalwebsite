import { useDispatch, useSelector } from "react-redux";
import AboutMeEditor from "../../src/components/about-me/AboutMeEditor";
import FileForm from "../../src/components/about-me/FileForm";
import Tabs from "../../src/components/about-me/Tabs";
import ProgressBar from "../../src/components/elements/ProgressBar";
import { aboutMeActions } from "../../src/store/about-me";

const AboutMe = () => {
  // const tabs = ["General", "Skills", "Hobbies", "Interests"];
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const files = useSelector((state) => state.aboutMe.files);
  const editingFile = useSelector((state) => state.aboutMe.editingFile);

  const handleChangeTab = (selectedFile) => {
    dispatch(
      aboutMeActions.update({
        currentFile: { ...selectedFile },
      })
    );
  };

  return (
    <div>
      <Tabs files={files} onChangeTab={handleChangeTab} />
      {isAuthenticated && <AboutMeEditor />}
      {editingFile && <FileForm />}
    </div>
  );
};

export default AboutMe;
