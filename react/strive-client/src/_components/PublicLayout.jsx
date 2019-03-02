import React from "react";

export class PublicLayout extends React.Component {
  render() {
    return (
      <div>
        <h2>PublicLayout start</h2>
        {this.props.children}
        <h2>PublicLayout end</h2>
      </div>
    );
  }
}
