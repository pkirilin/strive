import React from "react";
import { ListGroupItem, Fade, Button } from "reactstrap";

export class ProjectListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false
    };

    this.toggleProjectButtons = this.toggleProjectButtons.bind(this);
  }

  toggleProjectButtons() {
    this.setState({
      showButtons: !this.state.showButtons
    });
  }

  render() {
    return (
      <ListGroupItem
        tag="a"
        href="#"
        action
        onMouseEnter={this.toggleProjectButtons}
        onMouseLeave={this.toggleProjectButtons}
      >
        <div className="d-flex align-items-center">
          <div className="justify-content-start">{this.props.data.name}</div>
          <Fade in={this.state.showButtons} className="flex-fill">
            <div className="d-flex justify-content-end">
              <Button className="mr-2">Edit</Button>
              <Button>Delete</Button>
            </div>
          </Fade>
        </div>
      </ListGroupItem>
    );
  }
}
