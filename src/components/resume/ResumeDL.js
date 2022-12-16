import CardHeader from "../cards/CardHeader";
import style from "./ResumeDL.module.css";
import Image from "../elements/Image";
import Button from "../elements/Button";
//Create a download for pdf <a href="/resources/resume/pdfname" download />

const ResumeDL = (props) => {
  const { resume, name, image } = props;
  const headline = "/resources/resumes/";

  const header = (
    <div className={style.imageContainer}>
      <Image src={`${headline}${image}`} className={style.resumeImage} alt="" />
    </div>
  );
  return (
    <CardHeader header={header} className={style.resumeCard}>
      <h3>{name}</h3>
      <Button>
        <a href={`${headline}${resume}`} target="_blank" rel="noreferrer">
          View
        </a>
      </Button>
    </CardHeader>
  );
};

export default ResumeDL;
