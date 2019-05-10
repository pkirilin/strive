import { history } from "./history.helper";

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
  redirectToEditProject
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
