import React from "react";
import { connect } from "react-redux";
import {
  PrivateLayout,
  AppHeader,
  DocumentTitleSetter
} from "../../_components";
import { EditProjectForm } from "./EditProjectForm";
import { projectsActions } from "../../_actions";

class EditProjectPage extends React.Component {
  constructor(props) {
    super(props);

    // Getting projectId for editing from request string
    const { projectId } = this.props.match.params;
    this.props.dispatch(projectsActions.getInfo(projectId));
  }

  render() {
    return (
      <DocumentTitleSetter values={["Edit project"]}>
        <PrivateLayout>
          <AppHeader>Edit project</AppHeader>
          <EditProjectForm />
        </PrivateLayout>
      </DocumentTitleSetter>
    );
  }
}

const connectedEditProjectPage = connect()(EditProjectPage);
export { connectedEditProjectPage as EditProjectPage };
