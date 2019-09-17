import React, { Component } from "react";
import PropTypes from "prop-types";
import { Spinner, SectionSeparator } from "../../../_components";
import TaskListContainer from "../TaskListContainer";
import ProjectDataContainer from "../ProjectDataContainer";
import TaskChoosePanelContainer from "../TaskChoosePanelContainer";
import ProjectActionsContainer from "../ProjectActionsContainer";
import TaskStatusTabsPanelContainer from "../TaskStatusTabsPanelContainer";

export default class ProjectContent extends Component {
  static propTypes = {
    projectId: PropTypes.number.isRequired,
    loadingProjectData: PropTypes.bool,
    projectDataLoaded: PropTypes.bool,
    projectInfoError: PropTypes.shape({
      message: PropTypes.string.isRequired
    }),
    deletingProject: PropTypes.bool,
    loadProjectContent: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { projectId, loadProjectContent } = this.props;
    loadProjectContent(projectId);
  }

  render() {
    const {
      loadingProjectData,
      projectDataLoaded,
      projectInfoError,
      deletingProject
    } = this.props;

    if (loadingProjectData) {
      return <Spinner text="Getting project info from server" />;
    }

    if (projectInfoError) {
      return (
        <SectionSeparator>
          <div className="text-danger text-center">
            {projectInfoError.message}
          </div>
        </SectionSeparator>
      );
    }

    if (projectDataLoaded) {
      const { projectId } = this.props;
      return (
        <div>
          {deletingProject && <Spinner text="Deleting project" />}
          <ProjectDataContainer />
          <ProjectActionsContainer />
          <TaskStatusTabsPanelContainer projectId={projectId} />
          <TaskChoosePanelContainer projectId={projectId} />
          <TaskListContainer projectId={projectId} />
        </div>
      );
    }

    return <div></div>;
  }
}
