import React from "react";
import { connect } from "react-redux";
import { history } from "../_helpers";
import { alertActions } from "../_actions";

const mapStateToProps = state => {
  const { alertReducer } = state;
  return {
    alertReducer
  };
};

class Alert extends React.Component {
  constructor(props) {
    super(props);

    // Clear alert on location change
    history.listen(() => {
      this.props.dispatch(alertActions.clear());
    });
  }

  render() {
    const { alertReducer } = this.props;
    return (
      <div>
        {alertReducer.message && (
          <div className={`alert ${alertReducer.cssClass}`}>
            {alertReducer.message}
          </div>
        )}
      </div>
    );
  }
}

const connectedAlert = connect(mapStateToProps)(Alert);
export { connectedAlert as Alert };
