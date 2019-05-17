import React from "react";
import {
  DocumentTitleSetter,
  PrivateLayout,
  AppHeader
} from "../../_components";
import { ProjectData } from "./ProjectData";
import { TaskStatusTabsPanel } from "./TaskStatusTabsPanel";
import { TaskFilter } from "./TaskFilter";
import { TaskChoosePanel } from "./TaskChoosePanel";
import { TaskList } from "./TaskList";

export const ProjectInfoPage = props => {
  let { projectId } = props.match.params;

  // Testing
  let project = {
    id: projectId,
    name: "Name",
    description: "Description"
  };
  let tasks = [
    {
      id: 0,
      name: "test",
      checked: false
    }
  ];

  return (
    <DocumentTitleSetter values={["Project", "Name"]}>
      <PrivateLayout>
        <AppHeader>Project info</AppHeader>
        <ProjectData data={project} />
        <TaskStatusTabsPanel />
        <TaskFilter />
        <TaskChoosePanel />
        <TaskList tasks={tasks} />
      </PrivateLayout>
    </DocumentTitleSetter>
  );
};
