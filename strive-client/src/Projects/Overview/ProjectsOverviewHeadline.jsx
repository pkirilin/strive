import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { AppHeader } from "../../_components";
import { actionHelper } from "../../_helpers";

const mapStateToProps = state => {
  return {
    projects: state.projectsReducer.projectListReducer.projects
  };
};

class ProjectsOverviewHeadline extends React.Component {
  constructor(props) {
    super(props);

    this.createProject = this.createProject.bind(this);
  }

  createProject() {
    actionHelper.redirectToCreateProject();
  }

  render() {
    return (
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <AppHeader level="2" centered={false}>
          Projects list
        </AppHeader>
        <Button color="light border" onClick={this.createProject}>
          Create project
        </Button>
      </div>
    );
  }
}

const connectedProjectsPageHeadline = connect(mapStateToProps)(
  ProjectsOverviewHeadline
);
export { connectedProjectsPageHeadline as ProjectsOverviewHeadline };
