import React from "react";
import { connect } from "react-redux";
import { DocumentTitleSetter, PrivateLayout } from "../../_components";
import { TaskData } from "./TaskData";

const mapStateToProps = state => {
  let { notFound: notFoundTaskData } = state.tasksReducer.taskInfoReducer;
  return {
    notFoundTaskData
  };
};

class TaskInfoPage extends React.Component {
  constructor(props) {
    super(props);

    this.taskId = Number(this.props.match.params.taskId);
  }

  render() {
    let { notFoundTaskData } = this.props;
    let content = <TaskData taskId={this.taskId} />;

    if (notFoundTaskData) {
      content = (
        <div className="mt-4 mb-4 text-danger text-center">
          Failed to get task: task was not found
        </div>
      );
    }

    return (
      <DocumentTitleSetter values={["Task info"]}>
        <PrivateLayout>{content}</PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}

const connectedTaskInfoPage = connect(mapStateToProps)(TaskInfoPage);
export { connectedTaskInfoPage as TaskInfoPage };
