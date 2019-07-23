import { connect } from "react-redux";
import ProjectData from "../components/ProjectData";

const mapStateToProps = state => {
  const { project } = state.projectsReducer.projectInfoReducer;
  return {
    project
  };
};

const ProjectDataContainer = connect(mapStateToProps)(ProjectData);

export default ProjectDataContainer;
