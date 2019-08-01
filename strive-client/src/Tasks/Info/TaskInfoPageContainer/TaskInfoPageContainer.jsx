import { connect } from "react-redux";
import TaskInfoPage from "../TaskInfoPage";

const mapStateToProps = state => {
  const { notFound: notFoundTaskData } = state.tasksReducer.taskInfoReducer;
  const { deletingTask } = state.tasksReducer.taskOperationsReducer;
  const { deleteTaskModal } = state.modalReducer;
  return {
    deletingTask,
    notFoundTaskData,
    deleteTaskModal
  };
};

const TaskInfoPageContainer = connect(mapStateToProps)(TaskInfoPage);

export default TaskInfoPageContainer;
