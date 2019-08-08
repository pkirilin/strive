import { connect } from "react-redux";
import { tasksActions } from "../../../_actions";
import EditTaskPage from "../EditTaskPage";

const mapDispatchToProps = dispatch => {
  function getTask(taskId) {
    dispatch(tasksActions.getInfo(taskId));
  }

  return {
    getTask
  };
};

const EditTaskPageContainer = connect(
  null,
  mapDispatchToProps
)(EditTaskPage);

export default EditTaskPageContainer;
