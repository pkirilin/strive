import React, { Component } from "react";
import PropTypes from "prop-types";
import { ProjectFormContainer } from "../../_shared";

export default class EditProjectForm extends Component {
  static propTypes = {
    projectId: PropTypes.number.isRequired
  };

  render() {
    const { projectId } = this.props;
    return (
      <ProjectFormContainer
        purpose="update"
        id="editProjectForm"
        loadingText="Updating project"
        submitButtonText="Save"
        projectId={projectId}
      />
    );
  }
}
