import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, SectionSeparator } from "../../../_components";

export default class ProjectData extends Component {
  static propTypes = {
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  };

  render() {
    const { project } = this.props;

    if (!project) {
      return <div />;
    }

    // Server is working and some project data was received
    return (
      <SectionSeparator>
        <Header level="4" centered={false}>
          {project.name}
        </Header>
        <div className="font-weight-light">{project.description}</div>
      </SectionSeparator>
    );
  }
}
