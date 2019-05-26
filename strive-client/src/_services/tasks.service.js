import { config, httpHeaders } from "../_helpers";

/** Encapsulates all backend API calls for performing operations on task controller */
export const tasksService = {
  /** Performs API call to API method responsible for getting a task list */
  getList
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
