import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  PrivateLayout,
  Header,
  DocumentTitleSetter,
  SectionSeparator
} from "../../../_components";
import EditTaskForm from "../EditTaskForm";

export default class EditTaskPage extends Component {
  static propTypes = {
    getTask: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const { taskId } = this.props.match.params;
    const { getTask } = this.props;
    getTask(taskId);
  }

  render() {
    return (
      <DocumentTitleSetter values={["Edit task"]}>
        <PrivateLayout>
          <SectionSeparator>
            <Header>Edit task</Header>
          </SectionSeparator>
          <SectionSeparator>
            <EditTaskForm />
          </SectionSeparator>
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}
