import React from "react";

export class PrivateLayout extends React.Component {
  render() {
    return (
      <div>
        <h2>PrivateLayout start</h2>
        {this.props.children}
        <h2>PrivateLayout end</h2>
      </div>
    );
  }
}
