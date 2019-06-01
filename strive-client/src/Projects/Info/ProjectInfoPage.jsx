import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  DocumentTitleSetter,
  PrivateLayout,
  AppConfirmationModal,
  AppSpinner
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
  let { deleteProjectModal } = state.modalReducer;
  let { deletingProject } = state.projectsReducer.projectOperationsReducer;
  return {
    notFoundProjectData,
    deleteProjectModal,
    deletingProject
  };
};

class ProjectInfoPage extends React.Component {
  static propTypes = {
    notFoundProjectData: PropTypes.bool,

    deleteProjectModal: PropTypes.shape({
      title: PropTypes.string,
      message: PropTypes.node,
      onClose: PropTypes.func,
      onConfirm: PropTypes.func
    }),

    deletingProject: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.projectId = Number(this.props.match.params.projectId);
  }

  render() {
    let {
      notFoundProjectData,
      deleteProjectModal,
      deletingProject
    } = this.props;

    let content = (
      <div>
        <AppConfirmationModal {...deleteProjectModal} />
        <ProjectData projectId={this.projectId} />
        <TaskStatusTabsPanel projectId={this.projectId} />
        <TaskFilter />
        <TaskChoosePanel />
        <div className="mt-4">
          <TaskList projectId={this.projectId} />
        </div>
      </div>
    );

    // Deleting project modal confirmed, modal closed, deleting in process. Showing loading spinner
    if (deletingProject) {
      content = <AppSpinner text="Deleting project" />;
    }

    if (notFoundProjectData) {
      content = (
        <div className="mt-4 mb-4 text-danger text-center">
          Failed to get project: project was not found
        </div>
      );
    }

    return (
      <DocumentTitleSetter values={["Project info"]}>
        <PrivateLayout>{content}</PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}

const connectedProjectInfoPage = connect(mapStateToProps)(ProjectInfoPage);
export { connectedProjectInfoPage as ProjectInfoPage };
