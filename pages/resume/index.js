import WebpageBackground from "../../src/components/backgrounds/WebpageBackground";
import ResumeDL from "../../src/components/resume/ResumeDL";
import { styleGroup } from "../../src/helpers/styles";
import style from "./Resume.module.css";
const Resume = () => {
  return (
    <div className={style.resumes}>
      <ResumeDL
        resume="Resume2023_8.pdf"
        name="Software Engineer 2023"
        image="Resume2023_1.png"
      />
      <ResumeDL
        resume="Resume2022_3.pdf"
        name="Software Engineer 2022"
        image="Resume2022_2.png"
      />
    </div>
  );
};

export default Resume;
