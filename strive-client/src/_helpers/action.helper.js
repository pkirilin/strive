import { history } from "./history.helper";
import { alertActions } from "../_actions";

/** Contains helper functions for using in app actions */
export const actionHelper = {
  /** Redirects user to root/home page */
  redirectToRoot,

  /** Redirects user to login page */
  redirectToLogin,

  /** Redirects user to project list page */
  redirectToProjects,

  /** Redirects user to create project page */
  redirectToCreateProject,

  /** Redirects user to edit project page */
  redirectToEditProject,

  /** Universal internal server error response handler */
  handleInternalServerErrorResponse
};

/** Redirects user to root/home page */
function redirectToRoot() {
  history.push("/");
}

/** Redirects user to login page */
function redirectToLogin() {
  history.push("/account/login");
}

/** Redirects user to project list page */
function redirectToProjects() {
  history.push("/projects/overview");
}

/** Redirects user to create project page */
function redirectToCreateProject() {
  history.push("/projects/create");
}

/**
 * Redirects user to edit project page
 * @param {number} projectId Project id for request string
 */
function redirectToEditProject(projectId) {
  history.push(`/projects/edit/${projectId}`);
}

/**
 * Universal internal server error response handler
 * @param {Promise} response Server response
 * @param {Function} dispatch Function for dispatching actions
 * @param {Function} error Error action creator
 */
function handleInternalServerErrorResponse(response, dispatch, error) {
  response.text().then(internalServerErrorMessage => {
    let errorMessage = `Internal server error. Error message: ${internalServerErrorMessage}`;
    dispatch(
      error({
        internalServerError: errorMessage
      })
    );
    dispatch(alertActions.error(errorMessage));
  });
}
