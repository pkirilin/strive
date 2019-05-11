import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import { history, config } from "../../_helpers";
import { alertActions } from "../../_actions";

const mapStateToProps = state => {
  const { alertReducer } = state;
  return {
    alertReducer
  };
};

class ApplicationAlert extends React.Component {
  static propTypes = {
    message: PropTypes.string,
    type: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.onDismiss = this.onDismiss.bind(this);

    this.dismissTimer = null;

    // Clear alert on location change
    history.listen(() => {
      this.onDismiss();
    });
  }

  componentWillUpdate(nextProps) {
    if (Object.keys(nextProps.alertReducer).length > 0) {
      // If alertReducer's state object is empty, component received clear action
      // Alert will be dismissed automatically in several seconds
      this.dismissTimer = setTimeout(() => {
        this.onDismiss();
      }, config.alerts.autoDismissTimeout);
    } else {
      // Reset dismiss timer to prevent situation, when component received an alert,
      // timer started, then component receives an alert again and it dismisses on old alert's timer
      if (this.dismissTimer !== null) {
        clearTimeout(this.dismissTimer);
        this.dismissTimer = null;
      }
    }
  }

  onDismiss() {
    this.props.dispatch(alertActions.clear());
  }

  render() {
    const { alertReducer } = this.props;

    return (
      <div>
        {alertReducer.message && (
          <Alert color={alertReducer.type} toggle={this.onDismiss}>
            {alertReducer.message}
          </Alert>
        )}
      </div>
    );
  }
}

const connectedApplicationAlert = connect(mapStateToProps)(ApplicationAlert);
export { connectedApplicationAlert as ApplicationAlert };
