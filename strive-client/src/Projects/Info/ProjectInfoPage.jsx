import React from "react";
import { connect } from "react-redux";
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

const mapStateToProps = state => {
  let {
    notFound: notFoundProjectData
  } = state.projectsReducer.projectInfoReducer;
  return {
    notFoundProjectData
  };
};

class ProjectInfoPage extends React.Component {
  constructor(props) {
    super(props);

    this.projectId = Number(this.props.match.params.projectId);
  }

  render() {
    let tasks = [
      {
        id: 0,
        name: "test",
        checked: false
      }
    ];

    let { notFoundProjectData } = this.props;

    let content = (
      <div>
        <ProjectData projectId={this.projectId} />
        <TaskStatusTabsPanel />
        <TaskFilter />
        <TaskChoosePanel />
        <TaskList tasks={tasks} />
      </div>
    );

    if (notFoundProjectData) {
      content = (
        <div className="mt-4 mb-4 text-danger text-center">
          Failed to get project: project was not found
        </div>
      );
    }

    return (
      <DocumentTitleSetter values={["Project", "Name"]}>
        <PrivateLayout>
          <AppHeader>Project info</AppHeader>
          {content}
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}

const connectedProjectInfoPage = connect(mapStateToProps)(ProjectInfoPage);
export { connectedProjectInfoPage as ProjectInfoPage };
