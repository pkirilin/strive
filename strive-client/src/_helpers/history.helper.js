import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

/** Contains helper wrappers for createBrowserHistory */
export const historyHelper = {
  /** Redirects user to previous page */
  goBack,

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

  /** Redirects user to project info page */
  redirectToProjectInfo,

  /** Redirects user to create task page */
  redirectToCreateTask,

  /** Redirects user to edit task page */
  redirectToEditTask,

  /** Redirects user to task info page */
  redirectToTaskInfo
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
 * Redirects user to project info page
 * @param {number} projectId Project id for request string
 */
function redirectToProjectInfo(projectId) {
  history.push(`/projects/info/${projectId}`);
}

/**
 * Redirects user to create task page
 * @param {number} projectId Id of project created task belongs to
 */
function redirectToCreateTask(projectId) {
  history.push("/tasks/create", { projectId });
}

/**
 * Redirects user to edit task page
 * @param {number} taskId Task id for request string
 */
function redirectToEditTask(taskId) {
  history.push(`/tasks/edit/${taskId}`);
}

/**
 * Redirects user to previous page
 */
function goBack() {
  history.goBack();
}

/**
 * Redirects user to task info page
 * @param {number} taskId Task id for request string
 */
function redirectToTaskInfo(taskId) {
  history.push(`/tasks/info/${taskId}`);
}
