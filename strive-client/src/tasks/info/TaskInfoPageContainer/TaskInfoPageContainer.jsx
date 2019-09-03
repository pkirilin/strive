import { connect } from "react-redux";
import TaskInfoPage from "../TaskInfoPage";

const mapStateToProps = state => {
  const { taskInfoError } = state.tasks.info;
  const { deletingTask } = state.tasks.operations;
  const { deleteTaskModal } = state.modals;
  return {
    taskInfoError,
    deletingTask,
    deleteTaskModal
  };
};

const TaskInfoPageContainer = connect(mapStateToProps)(TaskInfoPage);

export default TaskInfoPageContainer;
