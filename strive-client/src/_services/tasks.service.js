import { config, httpHeaders } from "../_helpers";

/** Encapsulates all backend API calls for performing operations on task controller */
export const tasksService = {
  /** Performs API call to API method responsible for getting a task list */
  getList,

  /** Performs API call to API method responsible for getting a task info */
  getInfo,

  /** Performs API call to API method responsible for creating a task */
  create,

  /** Performs API call to API method responsible for updating a task */
  update,

  /** Performs API call to API method responsible for deleting a task */
  delete: deleteTask,

  /** Performs API call to API method responsible for setting status for one or multiple tasks */
  setStatus
};

/**
 * Performs API call to API method responsible for getting a task list for specified project
 * @param {Object} requestParams Parameters for filtering tasks
 */
function getList(requestParams) {
  const requestOptions = {
    method: "GET",
    headers: httpHeaders.authorization()
  };
  const { projectId } = requestParams;
  return fetch(
    `${config.apiUrl}/tasks/get-list?projectId=${projectId}`,
    requestOptions
  );
}

/**
 * Performs API call to API method responsible for getting a task info
 * @param {number} taskId Task id
 */
function getInfo(taskId) {
  const requestOptions = {
    method: "GET",
    headers: httpHeaders.authorization()
  };
  return fetch(
    `${config.apiUrl}/tasks/get-info?taskId=${taskId}`,
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

/**
 * Performs API call to API method responsible for updating a task
 * @param {object} task Updated task data
 */
function update(task) {
  const requestOptions = {
    method: "PUT",
    headers: {
      ...httpHeaders.contentTypeJson,
      ...httpHeaders.authorization()
    },
    body: JSON.stringify(task)
  };
  return fetch(`${config.apiUrl}/tasks/update`, requestOptions);
}

/**
 * Performs API call to API method responsible for deleting a task
 * @param {number} taskId Id of task to be deleted
 */
function deleteTask(taskId) {
  const requestOptions = {
    method: "DELETE",
    headers: httpHeaders.authorization()
  };
  return fetch(`${config.apiUrl}/tasks/delete/${taskId}`, requestOptions);
}

/**
 * Performs API call to API method responsible for setting status for one or multiple tasks
 * @param {object} setStatusData Data object for setting task status: tasks collection and status label
 */
function setStatus(setStatusData) {
  const requestOptions = {
    method: "PUT",
    headers: {
      ...httpHeaders.contentTypeJson,
      ...httpHeaders.authorization()
    },
    body: JSON.stringify(setStatusData)
  };
  return fetch(`${config.apiUrl}/tasks/set-status`, requestOptions);
}
