import { config, httpHeaders } from "../_helpers";

/** Encapsulates all backend API calls for performing operations on task controller */
export const tasksService = {
  /** Performs API call to API method responsible for getting a task list */
  getList,

  /** Performs API call to API method responsible for creating a task */
  create
};

/**
 * Performs API call to API method responsible for getting a task list for specified project
 * @param {number} projectId Specified project id
 */
function getList(projectId) {
  const requestOptions = {
    method: "GET",
    headers: httpHeaders.authorization()
  };
  return fetch(
    `${config.apiUrl}/tasks/get-list?projectId=${projectId}`,
    requestOptions
  );
}

/**
 * Performs API call to API method responsible for creating a task
 * @param {object} task Task data
 */
function create(task) {
  const requestOptions = {
    method: "POST",
    headers: {
      ...httpHeaders.contentTypeJson,
      ...httpHeaders.authorization()
    },
    body: JSON.stringify(task)
  };
  return fetch(`${config.apiUrl}/tasks/create`, requestOptions);
}
