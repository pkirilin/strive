import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "../LoginForm";
import { accountActions } from "../../../_actions";

const LoginFormContainer = props => <LoginForm {...props} />;

LoginFormContainer.propTypes = {
  loggingIn: PropTypes.bool,
  performLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { loggingIn } = state.account.login;
  return { loggingIn };
};

const mapDispatchToProps = dispatch => {
  function performLogin(userLoginData) {
    dispatch(accountActions.login(userLoginData));
  }

  return {
    performLogin
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer);
