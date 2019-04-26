import React from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
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
    this.resources = this.props.resources;

    this.createProject = this.createProject.bind(this);
  }

  createProject() {
    history.push("/projects/create");
  }

  render() {
    let { buttons, titles } = this.resources.projects.overview;
    return (
      <Row className="p-3 d-flex align-items-center">
        <Col className="text-sm-left text-center">
          <SectionTitle>{titles.projectsListTitle}</SectionTitle>
        </Col>
        <Col className="pt-2 pb-2 d-flex justify-content-sm-end justify-content-center">
          <Button onClick={this.createProject}>{buttons.createProject}</Button>
        </Col>
      </Row>
    );
  }
}

const connectedProjectsPageHeadline = connect(mapStateToProps)(
  ProjectsPageHeadline
);
export { connectedProjectsPageHeadline as ProjectsPageHeadline };
