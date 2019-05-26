import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { AppHeader, AppSpinner } from "../../_components";
import { projectsActions } from "../../_actions";
import { actionHelper } from "../../_helpers";

const mapStateToProps = state => {
  let {
    gettingProject,
    project,
    failedToFetch
  } = state.projectsReducer.projectInfoReducer;
  return {
    gettingProject,
    project,
    failedToFetch
  };
};

class ProjectData extends React.Component {
  static propTypes = {
    projectId: PropTypes.number.isRequired,
    project: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  constructor(props) {
    super(props);

    this.onNewTask = this.onNewTask.bind(this);

    this.props.dispatch(projectsActions.getInfo(this.props.projectId));
  }

  onNewTask() {
    actionHelper.redirectToCreateTask(this.props.projectId);
  }

  render() {
    let { gettingProject, project, failedToFetch } = this.props;

    // Showing loading spinner while loading project data from server
    if (gettingProject) {
      return <AppSpinner text="Getting project data" />;
    }

    if (failedToFetch) {
      return (
        <div className="mt-4 mb-4 text-danger text-center">
          Failed to get project: server is not available
        </div>
      );
    }

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <AppHeader level="4" centered={false}>
            {project.name}
          </AppHeader>
          <UncontrolledDropdown>
            <DropdownToggle color="light border" caret>
              Actions
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header>Tasks</DropdownItem>
              <DropdownItem onClick={this.onNewTask}>New task</DropdownItem>
              <DropdownItem divider />
              <DropdownItem header>Project</DropdownItem>
              <DropdownItem>Edit project</DropdownItem>
              <DropdownItem>Delete project</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div>{project.description}</div>
      </div>
    );
  }
}

const connectedProjectData = connect(mapStateToProps)(ProjectData);
export { connectedProjectData as ProjectData };
