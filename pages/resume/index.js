import WebpageBackground from "../../src/components/backgrounds/WebpageBackground";
import ResumeDL from "../../src/components/resume/ResumeDL";
import { styleGroup } from "../../src/helpers/styles";
import style from "./Resume.module.css";
const Resume = () => {
  return (
    <div className={style.resumes}>
      <WebpageBackground src="/resources/pictures/Background2.jpg" />
      <ResumeDL
        resume="Resume2022_3.pdf"
        name="Software Engineer"
        image="Resume2022_2.png"
      />
    </div>
  );
};

export default Resume;
