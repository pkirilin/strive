import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AppHeader, AppSectionSeparator } from "../../_components";

const mapStateToProps = state => {
  let { project } = state.projectsReducer.projectInfoReducer;
  return { project };
};

class ProjectData extends React.Component {
  static propTypes = {
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  };

  render() {
    const { project } = this.props;

    if (!project) {
      return <div />;
    }

    // Server is working and some project data was received
    return (
      <AppSectionSeparator>
        <AppHeader level="4" centered={false}>
          {project.name}
        </AppHeader>
        <div className="font-weight-light">{project.description}</div>
      </AppSectionSeparator>
    );
  }
}

const connectedProjectData = connect(mapStateToProps)(ProjectData);
export { connectedProjectData as ProjectData };
