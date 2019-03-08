import React from "react";

export class CenteredFormLayout extends React.Component {
  render() {
    return (
      <div className="row d-flex justify-content-center">
        <div className="col-xl-4 col-lg-6 col-md-8 col-sm-12 col-12">
          <div className="p-lg-3 p-md-2 p-sm-1 p-1">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
