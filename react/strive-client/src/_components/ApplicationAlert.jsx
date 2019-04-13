import React from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import { history, config } from "../_helpers";
import { alertActions } from "../_actions";

const mapStateToProps = state => {
  const { alertReducer } = state;
  return {
    alertReducer
  };
};

class ApplicationAlert extends React.Component {
  constructor(props) {
    super(props);

    this.onDismiss = this.onDismiss.bind(this);

    // Clear alert on location change
    history.listen(() => {
      this.onDismiss();
    });
  }

  componentWillUpdate(nextProps) {
    if (Object.keys(nextProps.alertReducer).length > 0) {
      // If alertReducer's state object is empty, comp received clear action
      // Alert will be dismissed automatically in some time
      setTimeout(() => {
        this.onDismiss();
      }, config.alerts.autoDismissTimeout);
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
