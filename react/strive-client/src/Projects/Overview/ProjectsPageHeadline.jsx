import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { history } from "../../_helpers";
import { SectionTitle } from "../../_components";
//import { projectsActions } from "../../_actions";

const mapStateToProps = state => {
  return {
    projects: state.projectsReducer.projectListReducer.projects
  };
};

class ProjectsPageHeadline extends React.Component {
  constructor(props) {
    super(props);

    this.createProject = this.createProject.bind(this);
  }

  createProject() {
    history.push("/projects/create");
  }

  render() {
    return (
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <SectionTitle>Projects list</SectionTitle>
        <Button onClick={this.createProject}>Create project</Button>
      </div>
    );
  }
}

const connectedProjectsPageHeadline = connect(mapStateToProps)(
  ProjectsPageHeadline
);
export { connectedProjectsPageHeadline as ProjectsPageHeadline };
