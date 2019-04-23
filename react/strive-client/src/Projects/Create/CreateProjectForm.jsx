import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { InputField } from "../../_components";
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
            <InputField
              type="text"
              label="Title"
              placeholder="Project title"
              help="Project title help"
            />
          </FormGroup>
          <FormGroup>
            <Label className="font-weight-bold">Description</Label>
            <Input type="textarea" rows="4" placeholder="Project description" />
            <small className="form-text text-muted">Project description</small>
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
