import { config, httpHeaders } from "../_helpers";
import Cookies from "js-cookie";

/** Encapsulates all backend API calls for performing operations on project controller */
export const projectsService = {
  /** Performs API call to API method responsible for getting a project list */
  getList,

  /** Performs API call to API method responsible for getting project info by id */
  getInfo,

  /** Performs API call to API method responsible for creating a project */
  create,

  /** Performs API call to API method responsible for updating a project */
  update,

  /** Performs API call to API method responsible for deleting a project */
  delete: deleteProject
};

/** Performs API call to API method responsible for getting a project list */
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
 * Performs API call to API method responsible for getting project info by id
 * @param {number} projectId Target project id
 */
function getInfo(projectId) {
  let userFromCookies = Cookies.getJSON(config.cookies.user.keyName);
  const requestOptions = {
    method: "GET",
    headers: httpHeaders.authorization()
  };
  return fetch(
    `${config.apiUrl}/projects/get-info?projectId=${projectId}&userId=${
      userFromCookies.id
    }`,
    requestOptions
  );
}

/**
 * Performs API call to API method responsible for creating a project
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
 * Performs API call to API method responsible for updating a project
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

/**
 * Performs API call to API method responsible for deleting a project
 * @param {number} projectId Id of project to be deleted
 */
function deleteProject(projectId) {
  const requestOptions = {
    method: "DELETE",
    headers: httpHeaders.authorization()
  };
  return fetch(`${config.apiUrl}/projects/delete/${projectId}`, requestOptions);
}
