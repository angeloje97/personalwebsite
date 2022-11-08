import { useSelector } from "react-redux";
import AboutMeEditor from "../../src/components/about-me/AboutMeEditor";
import FileForm from "../../src/components/about-me/FileForm";
import Tabs from "../../src/components/about-me/Tabs";
import ProgressBar from "../../src/components/elements/ProgressBar";

const AboutMe = () => {
  // const tabs = ["General", "Skills", "Hobbies", "Interests"];
  const handleChangeTab = (selectedTab) => {};
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const files = useSelector((state) => state.aboutMe.files);
  const editingFile = useSelector((state) => state.aboutMe.editingFile);

  return (
    <div>
      <Tabs files={files} onChangeTab={handleChangeTab} />
      {isAuthenticated && <AboutMeEditor />}
      {editingFile && <FileForm />}
    </div>
  );
};

export default AboutMe;
