import { useSelector } from "react-redux";
import { projActions } from "./projects";

export const removeSelectedProjects = (
  selectedIds,
  currentProjects,
  sessionId
) => {
  return async (dispatch) => {
    const response = await fetch("/api/projects/remove", {
      method: "DELETE",
      body: JSON.stringify({
        projectIds: selectedIds,
        sessionId,
      }),
      "Content-Type": "Application/json",
    });

    const data = await response.json();
    console.log(data.body);

    if (data.body.deletedCount > 0) {
      dispatch(
        projActions.setProjects({
          projects: currentProjects.filter(
            (proj) => !selectedIds.includes(proj._id)
          ),
        })
      );
    }
  };
};

export const addNewProject = (createdProject, currentProjects, sessionId) => {
  return async (dispatch) => {
    createdProject.created = new Date();
    createdProject.updated = new Date();
    createdProject.tags = createdProject.tags.split(", ");

    const response = await fetch("/api/projects/new", {
      method: "POST",
      body: JSON.stringify({ createdProject, sessionId }),
      "Content-Type": "Application/json",
    });

    const data = await response.json();

    createdProject._id = data.body.newProject.insertedId;
    createdProject.created = `${createdProject.created}`;
    createdProject.updated = `${createdProject.updated}`;

    if (currentProjects) {
      dispatch(
        projActions.setProjects({
          projects: [...currentProjects, createdProject],
        })
      );
    }
  };
};
