import { httpHeaders, config } from "../_helpers";

/** Encapsulates all backend API calls for performing operations on taskStatuses controller */
export const taskStatusesService = {
  /** Performs API call to API method responsible for getting a task info */
  getStatusTabs
};

/**
 * Performs API call to API method responsible for getting a task info
 * @param {number} projectId Project identifier for result data
 */
function getStatusTabs(projectId) {
  const requestOptions = {
    method: "GET",
    headers: httpHeaders.authorization()
  };
  return fetch(
    `${config.apiUrl}/task-statuses/get-status-tabs?projectId=${projectId}`,
    requestOptions
  );
}
