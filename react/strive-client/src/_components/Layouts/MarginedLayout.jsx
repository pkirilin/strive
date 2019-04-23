import React from "react";

export class MarginedLayout extends React.Component {
  render() {
    return (
      <div className="ml-lg-5 ml-md-5 ml-sm-3 ml-1 mr-lg-5 mr-md-5 mr-sm-3 mr-1 mt-lg-4 mt-md-4 mt-sm-3 mt-2">
        {this.props.children}
      </div>
    );
  }
}
