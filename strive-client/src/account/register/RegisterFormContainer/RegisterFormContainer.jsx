import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RegisterForm from "../RegisterForm";
import { accountActions } from "../../../_actions";

const RegisterFormContainer = props => <RegisterForm {...props} />;

RegisterFormContainer.propTypes = {
  registering: PropTypes.bool,
  badRequestResponse: PropTypes.shape({
    emailRemote: PropTypes.arrayOf(PropTypes.string),
    usernameRemote: PropTypes.arrayOf(PropTypes.string)
  }),
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
  function performRegister(formData) {
    dispatch(accountActions.register(formData));
  }

  return {
    performRegister
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterFormContainer);
