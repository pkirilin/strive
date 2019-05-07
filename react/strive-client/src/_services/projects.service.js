import { config, httpHeaders } from "../_helpers";
import Cookies from "js-cookie";

/** Encapsulates all backend api calls for performing operations on project controller */
export const projectsService = {
  /** Performs api call to API method responsible for getting a project list */
  getList,

  /** Performs api call to API method responsible for getting project info by id */
  getInfo,

  /** Performs api call to API method responsible for creating a project */
  create,

  /** Performs api call to API method responsible for updating a project */
  update
};

/** Performs api call to API method responsible for getting a project list */
function getList() {
  let userFromCookies = Cookies.getJSON(config.cookies.user.keyName);
  const requestOptions = {
    method: "GET",
    headers: httpHeaders.authorization()
  };
  return fetch(
    `${config.apiUrl}/projects/get-list?userId=${userFromCookies.id}`,
    requestOptions
  );
}

/**
 * Performs api call to API method responsible for getting project info by id
 * @param {number} projectId Target project id
 */
function getInfo(projectId) {
  const requestOptions = {
    method: "GET",
    headers: httpHeaders.authorization()
  };
  return fetch(
    `${config.apiUrl}/projects/get-info?projectId=${projectId}`,
    requestOptions
  );
}

/**
 * Performs api call to API method responsible for creating a project
 * @param {object} project Project data
 */
function create(project) {
  let userFromCookies = Cookies.getJSON(config.cookies.user.keyName);
  // Setting userId explicitly as it is not entered in create form
  project["userId"] = userFromCookies.id;

  const requestOptions = {
    method: "POST",
    headers: {
      ...httpHeaders.contentTypeJson,
      ...httpHeaders.authorization()
    },
    body: JSON.stringify(project)
  };
  return fetch(`${config.apiUrl}/projects/create`, requestOptions);
}

/**
 * Performs api call to API method responsible for updating a project
 * @param {number} projectId Id of project to be updated
 * @param {object} project Modified project data
 */
function update(projectId, project) {
  let userFromCookies = Cookies.getJSON(config.cookies.user.keyName);
  // Setting userId explicitly as it is not entered in create form
  project["userId"] = userFromCookies.id;

  const requestOptions = {
    method: "PUT",
    headers: {
      ...httpHeaders.contentTypeJson,
      ...httpHeaders.authorization()
    },
    body: JSON.stringify(project)
  };
  return fetch(`${config.apiUrl}/projects/update/${projectId}`, requestOptions);
}
