import React from "react";
import { Form, FormGroup, Button, Row, Col } from "reactstrap";
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
              placeholder="Enter project's title"
            />
          </FormGroup>

          <FormGroup>
            <TextArea
              label="Description"
              placeholder="Enter project's description"
            />
          </FormGroup>

          <FormGroup className="">
            {/* Alignment right */}
            <Row>
              <Col sm={{ size: 6, offset: 6 }} xs={{ size: 12, offset: 0 }}>
                <Row>
                  <Col className="pt-2 pb-2">
                    <Button className="col">Create</Button>
                  </Col>
                  <Col className="pt-2 pb-2">
                    <Button className="col" onClick={this.cancel}>
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Alignment between */}
            {/* <Row>
              <Col className="pt-2 pb-2">
                <Button className="col-sm-4 col-12">Create</Button>
              </Col>
              <Col className="pt-2 pb-2 d-flex justify-content-end">
                <Button className="col-sm-4 col-12" onClick={this.cancel}>
                  Cancel
                </Button>
              </Col>
            </Row> */}
          </FormGroup>
        </Form>
      </div>
    );
  }
}
