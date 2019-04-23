import React from "react";
import { Form, FormGroup, Button } from "reactstrap";
import { TextBox, TextArea } from "../../_components";
import { history } from "../../_helpers";

export class CreateProjectForm extends React.Component {
  cancel() {
    history.push("/projects/overview");
  }

  render() {
    return (
      <div className="col-12">
        <Form>
          <FormGroup>
            <TextBox
              type="text"
              label="Title"
              placeholder="Project title"
              help="Project title help"
            />
          </FormGroup>

          <FormGroup>
            <TextArea
              label="Description"
              placeholder="Project description"
              help="Project description help"
            />
          </FormGroup>

          <FormGroup className="d-flex justify-content-between">
            <Button className="col-3">Create</Button>
            <Button className="col-3" onClick={this.cancel}>
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
