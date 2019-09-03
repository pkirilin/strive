import { connect } from "react-redux";
import TaskData from "../TaskData";
import { tasksActions } from "../../../_actions";

const mapStateToProps = state => {
  let { gettingTask, task, taskInfoError } = state.tasks.info;
  return {
    gettingTask,
    task,
    taskInfoError
  };
};

const mapDispatchToProps = dispatch => {
  function getTask(taskId) {
    dispatch(tasksActions.getInfo(taskId));
  }

  return {
    getTask
  };
};

const TaskDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskData);

export default TaskDataContainer;
