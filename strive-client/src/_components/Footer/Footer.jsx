import React, { Component } from "react";
import { config } from "../../_helpers";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear()
    };
  }

  shouldComponentUpdate() {
    let currentYear = new Date().getFullYear();
    if (currentYear !== this.state.year) {
      this.setState({
        year: currentYear
      });
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <hr />
        <div className="text-center">
          &copy; {config.brandName}, {this.state.year}
        </div>
      </div>
    );
  }
}
