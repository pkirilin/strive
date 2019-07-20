import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RegisterForm from "../components/RegisterForm";
import { alertActions, accountActions } from "../../../_actions";

const RegisterFormContainer = props => <RegisterForm {...props} />;

RegisterFormContainer.propTypes = {
  registering: PropTypes.bool,
  badRequestResponse: PropTypes.shape({
    emailRemote: PropTypes.arrayOf(PropTypes.string),
    usernameRemote: PropTypes.arrayOf(PropTypes.string)
  }),
  clearAlert: PropTypes.func,
  performRegister: PropTypes.func
};

const mapStateToProps = state => {
  const { registering, badRequestResponse } = state.account.register;
  return {
    registering,
    badRequestResponse
  };
};

const mapDispatchToProps = dispatch => {
  function clearAlert() {
    dispatch(alertActions.clear());
  }

  function performRegister(formData) {
    dispatch(accountActions.register(formData));
  }

  return {
    clearAlert,
    performRegister
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterFormContainer);
