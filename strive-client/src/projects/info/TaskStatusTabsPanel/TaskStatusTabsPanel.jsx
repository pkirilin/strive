import React, { Component } from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink, Badge } from "reactstrap";
import { Spinner, SectionSeparator } from "../../../_components";

export default class TaskStatusTabsPanel extends Component {
  static propTypes = {
    projectId: PropTypes.number.isRequired,
    loadingStatusTabs: PropTypes.bool,
    statusTabsData: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        countTasks: PropTypes.number.isRequired
      })
    ),
    statusTabsError: PropTypes.shape({
      message: PropTypes.string.isRequired
    }),
    updateTaskFilter: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    // Tracking the first fetch, when activeTabIndex is not initialized
    // and statusTabsData was received, so setting last tab ("All") to active by default
    if (this.state.activeTabIndex === undefined && nextProps.statusTabsData) {
      this.setState({
        activeTabIndex: nextProps.statusTabsData.length - 1
      });
    }
    return true;
  }

  render() {
    const { loadingStatusTabs, statusTabsData, statusTabsError } = this.props;

    if (loadingStatusTabs) {
      return <Spinner text="Loading status tabs" />;
    }

    if (statusTabsError) {
      return (
        <SectionSeparator>
          <div className="text-danger text-center">
            {statusTabsError.message}
          </div>
        </SectionSeparator>
      );
    }

    if (statusTabsData) {
      return (
        <SectionSeparator>
          <Nav tabs>
            {statusTabsData.map(statusTab => (
              <NavItem
                key={statusTab.index}
                onClick={() => {
                  this.setState(
                    {
                      activeTabIndex: statusTab.index
                    },
                    () => {
                      const { updateTaskFilter, projectId } = this.props;
                      updateTaskFilter({
                        status: statusTab.status,
                        projectId
                      });
                    }
                  );
                }}
              >
                <NavLink
                  className="text-body"
                  href="#"
                  active={this.state.activeTabIndex === statusTab.index}
                >
                  {statusTab.status}{" "}
                  <Badge color="light">{statusTab.countTasks}</Badge>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </SectionSeparator>
      );
    }

    return <div />;
  }
}
