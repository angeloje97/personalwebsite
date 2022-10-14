import Tabs from "../src/components/about-me/Tabs";
import ProgressBar from "../src/components/elements/ProgressBar";

const AboutMe = () => {
  const tabs = ["General", "Skills", "Hobbies", "Interests"];
  const handleChangeTab = (selectedTab) => {};
  return (
    <div>
      <Tabs tabs={tabs} onChangeTab={handleChangeTab} />
    </div>
  );
};

export default AboutMe;
