import { connect } from "react-redux";
import ProjectData from "../components/ProjectData";

const mapStateToProps = state => {
  const { project } = state.projects.info;
  return {
    project
  };
};

const ProjectDataContainer = connect(mapStateToProps)(ProjectData);

export default ProjectDataContainer;
