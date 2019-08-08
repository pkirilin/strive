import { connect } from "react-redux";
import { alertActions } from "../../../_actions";
import CreateTaskPage from "../CreateTaskPage";

const mapDispatchToProps = dispatch => {
  function sendRedirectNotification() {
    dispatch(
      alertActions.error(
        "Unable to determine project id. Redirected to your project list"
      )
    );
  }

  return {
    sendRedirectNotification
  };
};

const CreateTaskPageContainer = connect(
  null,
  mapDispatchToProps
)(CreateTaskPage);

export default CreateTaskPageContainer;
