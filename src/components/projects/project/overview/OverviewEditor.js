import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from "./OverviewEditor.module.css";
import Modal from "../../../modals/Modal";
import CardHeader from "../../../cards/CardHeader";
import DynamicInput from "../../../dynamics/DynamicInput";
import Input from "../../../elements/Input";
import TextArea from "../../../elements/TextArea";
import Button from "../../../elements/Button";
import DynamicList from "../../../dynamics/DynamicList";
import LinkInput from "../../../elements/LinkInput";

const OverviewEditor = (props) => {
  const currentProject = useSelector((state) => state.proj.currentProject);

  const [initialState, setInitialSate] = useState(
    currentProject.overview
      ? currentProject.overview
      : {
          media: { type: "Video" },
          links: [],
        }
  );

  const [overviewData, setOverviewData] = useState(initialState);

  useEffect(() => {
    if (currentProject.overview) {
      setInitialSate(currentProject.overview);
      setOverviewData(currentProject.overview);
    }
  }, []);

  const headerContent = (
    <div className={style.header}>{currentProject.name} Overview</div>
  );

  const updateData = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    setOverviewData((prev) => {
      const newData = { ...prev };
      newData[id] = value;

      return newData;
    });
  };

  const close = (event) => {
    props.onClickOut();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (props.onSubmit) {
      props.onSubmit(overviewData);
    }

    close();
  };

  const handleLinkChange = (data) => {
    setOverviewData((prev) => {
      const newData = { ...prev };
      newData.links = data;

      if (newData.links.length === 1 && newData.links[0].url) {
        if (newData.links[0].url.trim() === "") {
          newData.links = [];
        }
      }

      return newData;
    });
  };

  useEffect(() => {
    console.log(overviewData);
  }, [overviewData]);

  const handleChangeDynamic = (data) => {
    setOverviewData((prev) => {
      const newData = {};
      newData.media = { ...data.target };
      newData.media.link = newData.media.value;

      for (const prop in prev) {
        if (prop === "media") continue;
        newData[prop] = prev[prop];
      }

      return newData;
    });
  };

  return (
    <Modal onClickOut={close}>
      <CardHeader header={headerContent} className={style.card}>
        <form onSubmit={handleSubmit}>
          <div className={style.body}>
            <div className={style.firstInputs}>
              <Input
                placeholder="Overview Title"
                value={overviewData.title}
                onChange={updateData}
                id="title"
              />
              <DynamicInput
                className={style.media}
                id="media"
                types={["Video", "Image"]}
                value={overviewData.media}
                placeholder="Media Link"
                onChange={handleChangeDynamic}
              ></DynamicInput>
              <TextArea
                resize="none"
                className={style.textArea}
                placeholder="Description"
                onChange={updateData}
                value={overviewData.description}
                id="description"
              />
            </div>
            <div className={style.links}>
              <DynamicList
                className={style.linkList}
                startingValue={overviewData.links}
                onChange={handleLinkChange}
                templateValue={{ name: "", link: "" }}
              >
                <LinkInput />
              </DynamicList>
            </div>
          </div>
          <div className={style.buttons}>
            <Button type="submit">Confirm</Button>
            <Button onClick={close}>Cancel</Button>
          </div>
        </form>
      </CardHeader>
    </Modal>
  );
};

export default OverviewEditor;
