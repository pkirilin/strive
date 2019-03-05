import React from "react";

export class Footer extends React.Component {
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
    }
  }

  render() {
    return (
      <div>
        <hr />
        <div className="text-center">&copy; Strive, {this.state.year}</div>
      </div>
    );
  }
}
