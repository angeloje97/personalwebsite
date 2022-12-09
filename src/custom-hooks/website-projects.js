import { useDispatch, useSelector } from "react-redux";
import { projActions } from "../store/projects";

export const useContent = (control) => {
  const routingData = useSelector((state) => state.proj.routingData);
  const currentProject = useSelector((state) => state.proj.currentProject);
  const dispatch = useDispatch();

  const { sectionIndex, contentIndex } = routingData;

  const currentContent = useSelector(
    (state) =>
      state.proj.currentProject.sections[sectionIndex].contents[contentIndex]
  );

  if (control) {
    const oldContent = currentProject.sections[sectionIndex].contents;

    const setCurrentContent = (newContent) => {
      const newContents = [];

      for (let i = 0; i < oldContent.length; i++) {
        if (i === contentIndex) {
          newContents.push(newContent);
          continue;
        }
        newContents.push(oldContent[i]);
      }

      dispatch(
        projActions.updateCurrentProjectContent({ newContents, sectionIndex })
      );
    };

    return [currentContent, setCurrentContent];
  }

  return currentContent;
};
