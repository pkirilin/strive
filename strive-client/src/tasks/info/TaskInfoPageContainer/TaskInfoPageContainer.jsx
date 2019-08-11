import { connect } from "react-redux";
import TaskInfoPage from "../TaskInfoPage";

const mapStateToProps = state => {
  const { notFound: notFoundTaskData } = state.tasks.info;
  const { deletingTask } = state.tasks.operations;
  const { deleteTaskModal } = state.modals;
  return {
    deletingTask,
    notFoundTaskData,
    deleteTaskModal
  };
};

const TaskInfoPageContainer = connect(mapStateToProps)(TaskInfoPage);

export default TaskInfoPageContainer;
