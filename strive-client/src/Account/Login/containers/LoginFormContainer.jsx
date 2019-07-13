import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "../components/LoginForm";
import { alertActions, accountActions } from "../../../_actions";

const LoginFormContainer = props => <LoginForm {...props} />;

LoginFormContainer.propTypes = {
  loggingIn: PropTypes.bool,
  clearAlert: PropTypes.func.isRequired,
  performLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { loggingIn } = state.accountReducer.loginReducer;
  return { loggingIn };
};

const mapDispatchToProps = dispatch => {
  function clearAlert() {
    dispatch(alertActions.clear());
  }

  function performLogin(userLoginData) {
    dispatch(accountActions.login(userLoginData));
  }

  return {
    clearAlert,
    performLogin
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer);
