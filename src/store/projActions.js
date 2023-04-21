import { useSelector } from "react-redux";
import { projActions } from "./projects";

export const onStartProjects = () => {
  return (dispatch) => {
    dispatch(loadProjects());
  };
};

export const sortedProjects = (projects) => {
  return projects.sort((a, b) => {
    let aValue = a.favorite ? 1 : -1;
    let bValue = b.favorite ? 1 : -1;
    aValue += new Date(a.updated) > new Date(b.updated) ? 1 : -1;
    return bValue - aValue;
  });
};

export const loadProjects = () => {
  return async (dispatch) => {
    dispatch(projActions.update({ loading: true }));
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();

      const fetchedProjects = sortedProjects(data.body.projects);

      dispatch(projActions.setProjects({ projects: fetchedProjects }));
    } catch (error) {}
    dispatch(projActions.update({ loading: false }));
  };
};

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

    if (data.body.deletedCount > 0) {
      dispatch(
        projActions.setProjects({
          projects: currentProjects.filter(
            (proj) => !selectedIds.includes(proj._id)
          ),
        })
      );

      dispatch(projActions.update({ removing: false }));
    }
  };
};

export const updateProject = (updatedProject, currentProjects, sessionId) => {
  return async (dispatch) => {
    const modifiedProject = { ...updatedProject };

    modifiedProject.updated = new Date();

    const response = await fetch("/api/projects/update", {
      method: "PUT",
      body: JSON.stringify({
        updatedProject: modifiedProject,
        sessionId,
      }),
      "Content-Type": "Application/json",
    });

    modifiedProject.updated = `${modifiedProject.updated}`;

    if (currentProjects) {
      const updatedProjects = currentProjects.filter(
        (proj) => proj._id !== modifiedProject._id
      );

      dispatch(
        projActions.setProjects({
          projects: sortedProjects([modifiedProject, ...updatedProjects]),
        })
      );
    }

    dispatch(
      projActions.update({
        editing: false,
      })
    );
  };
};

export const revertChanges = (projectId, projects) => {
  return (dispatch) => {
    const originalProject = projects.find((proj) => proj._id === projectId);
    if (originalProject) {
      dispatch(projActions.setCurrentProject({ project: originalProject }));
    }
  };
};

export const addNewProject = (createdProject, currentProjects, sessionId) => {
  return async (dispatch) => {
    createdProject.created = new Date();
    createdProject.updated = new Date();
    // createdProject.tags = createdProject.tags.split(", ");

    const response = await fetch("/api/projects/new", {
      method: "POST",
      body: JSON.stringify({ createdProject, sessionId }),
      "Content-Type": "Application/json",
    });

    const data = await response.json();
    if (!data.body) {
      dispatch(projActions.update({ creatingNew: false }));
      return;
    }

    createdProject._id = data.body.newProject.insertedId;
    createdProject.created = `${createdProject.created}`;
    createdProject.updated = `${createdProject.updated}`;

    if (currentProjects) {
      dispatch(
        projActions.setProjects({
          projects: sortedProjects([createdProject, ...currentProjects]),
        })
      );
    }
    dispatch(projActions.update({ creatingNew: false }));
  };
};
