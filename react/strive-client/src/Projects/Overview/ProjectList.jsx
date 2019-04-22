import React from "react";
import { connect } from "react-redux";
import { ListGroup } from "reactstrap";
import { ProjectListItem } from "./ProjectListItem";
import { projectsActions } from "../../_actions";

const mapStateToProps = state => {
  return {
    projects: state.projectsReducer.projectListReducer.projects
  };
};

class ProjectList extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(projectsActions.getAll());
  }

  render() {
    return (
      <ListGroup>
        {this.props.projects.map(project => (
          <ProjectListItem key={project.key} data={project} />
        ))}
      </ListGroup>
    );
  }
}

const connectedProjectList = connect(mapStateToProps)(ProjectList);
export { connectedProjectList as ProjectList };
