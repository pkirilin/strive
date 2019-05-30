import React from "react";
import { alertActions } from "./alert.actions";
import { taskListConstants, taskOperationsConstants } from "../_constants";
import { httpStatuses, actionHelper } from "../_helpers";
import { tasksService } from "../_services";
import { taskInfoConstants } from "../_constants/Tasks";

/** Contains Redux action creators for actions related to tasks */
export const tasksActions = {
  /** Redux action creator, gets tasks list for current user and project from server */
  getList,

  /** Redux action creator, gets task info for current user from server by id */
  getInfo,

  /** Redux action creator, selects/unselects all tasks for making changes */
  checkAll,

  /** Redux action creator, selects/unselects specified task */
  checkTarget,

  /** Redux action creator, creates a new task */
  create,

  /** Redux action creator, updates an existing task */
  update
};

/**
 * Redux action creator, gets tasks list for current user and project from server
 * @param {number} projectId Specified project id
 */
function getList(projectId) {
  return dispatch => {
    dispatch(request(projectId));
    tasksService.getList(projectId).then(
      taskListResponse => {
        switch (taskListResponse.status) {
          case httpStatuses.ok:
            taskListResponse.json().then(tasks => {
              dispatch(success(tasks));
            });
            break;
          case httpStatuses.unauthorized:
            actionHelper.redirectToLogin();
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              taskListResponse,
              dispatch,
              error
            );
            break;
          default:
            break;
        }
      },
      () => {
        dispatch(
          error({
            failedToFetch: true
          })
        );
      }
    );
  };

  /** Get tasks list request action creator */
  function request(projectId) {
    return {
      type: taskListConstants.GET_LIST_REQUEST,
      projectId
    };
  }

  /** Get tasks list success action creator */
  function success(tasks) {
    return {
      type: taskListConstants.GET_LIST_SUCCESS,
      tasks
    };
  }

  /** Get tasks list error action creator */
  function error(errorData) {
    return {
      type: taskListConstants.GET_LIST_ERROR,
      errorData
    };
  }
}

/**
 * Redux action creator, gets task info for current user from server by id
 * @param {number} taskId Task id
 */
function getInfo(taskId) {
  return dispatch => {
    dispatch(request(taskId));
    tasksService.getInfo(taskId).then(
      taskResponse => {
        switch (taskResponse.status) {
          case httpStatuses.ok:
            taskResponse.json().then(task => {
              dispatch(success(task));
            });
            break;
          case httpStatuses.unauthorized:
            actionHelper.redirectToProjects();
            break;
          case httpStatuses.notFound:
            dispatch(
              error({
                notFound: true
              })
            );
            break;
          default:
            break;
        }
      },
      () => {
        dispatch(
          error({
            failedToFetch: true
          })
        );
      }
    );
  };

  /** Get task info request action creator */
  function request(taskId) {
    return {
      type: taskInfoConstants.GET_TASK_REQUEST,
      taskId
    };
  }

  /** Get task info success action creator */
  function success(task) {
    return {
      type: taskInfoConstants.GET_TASK_SUCCESS,
      task
    };
  }

  /** Get task info error action creator */
  function error(errorData) {
    return {
      type: taskInfoConstants.GET_TASK_ERROR,
      errorData
    };
  }
}

/**
 * Redux action cretor, selects/unselects all tasks for making changes
 * @param {boolean} chooseAllChecked Current "Select all" checkbox value to determine which value needs to be applied to all tasks
 */
function checkAll(chooseAllChecked) {
  return {
    type: taskListConstants.CHECK_ALL,
    chooseAllChecked
  };
}

/**
 * Redux action cretor, selects/unselects specified task
 * @param {number} targetTaskId Id of task to be selected/unselected
 */
function checkTarget(targetTaskId) {
  return {
    type: taskListConstants.CHECK_TARGET,
    targetTaskId
  };
}

/**
 * Redux action creator, creates a new task
 * @param {object} task Task data
 */
function create(task) {
  return dispatch => {
    dispatch(request(task));
    tasksService.create(task).then(
      createTaskResponse => {
        switch (createTaskResponse.status) {
          case httpStatuses.ok:
            dispatch(success(task));
            actionHelper.redirectToProjectInfo(task.projectId);
            dispatch(
              alertActions.success(
                <div>
                  Task <b>{task.name}</b> has been successfully created
                </div>
              )
            );
            break;
          case httpStatuses.unauthorized:
            actionHelper.redirectToLogin();
            break;
          case httpStatuses.badRequest:
            createTaskResponse.json().then(badRequestData => {
              if (badRequestData) {
                dispatch(badRequest(badRequestData));
              }
            });
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              createTaskResponse,
              dispatch,
              error
            );
            break;
          default:
            break;
        }
      },
      errorResponse => {
        dispatch(error(errorResponse));
        dispatch(
          alertActions.error("Failed to create task: server is not available")
        );
      }
    );
  };

  /** Create task request action creator */
  function request(task) {
    return {
      type: taskOperationsConstants.CREATE_REQUEST,
      task
    };
  }

  /** Create task success action creator */
  function success(task) {
    return {
      type: taskOperationsConstants.CREATE_SUCCESS,
      task
    };
  }

  /** Create task error action creator */
  function error(error) {
    return {
      type: taskOperationsConstants.CREATE_ERROR,
      error
    };
  }

  /** Create task bad request action creator */
  function badRequest(badRequestResponseJson) {
    return {
      type: taskOperationsConstants.CREATE_BADREQUEST,
      badRequestResponseJson
    };
  }
}

/**
 * Redux action creator, updates an existing
 * @param {number} taskId Id of task to be updated
 * @param {object} task Updated task data
 */
function update(taskId, task) {
  return dispatch => {
    dispatch(request(taskId, task));
    tasksService.update(taskId, task).then(
      updateTaskResponse => {
        switch (updateTaskResponse.status) {
          case httpStatuses.ok:
            updateTaskResponse.json().then(updatedTask => {
              dispatch(success(taskId, updatedTask));
              actionHelper.goBack(() => {
                dispatch(
                  alertActions.success(
                    <div>
                      Task <b>{updatedTask.name}</b> has been successfully
                      updated
                    </div>
                  )
                );
              });
            });
            break;
          case httpStatuses.unauthorized:
            actionHelper.redirectToLogin();
            break;
          case httpStatuses.badRequest:
            updateTaskResponse.json().then(updateTaskBadRequestJsonData => {
              if (updateTaskBadRequestJsonData) {
                dispatch(badRequest(updateTaskBadRequestJsonData));
              }
            });
            break;
          case httpStatuses.notFound:
            updateTaskResponse.json().then(notFoundTaskId => {
              dispatch(
                error(`Server couldn't find a task with id = ${notFoundTaskId}`)
              );
              dispatch(
                alertActions.error(
                  "Failed to update task: server couldn't find target task"
                )
              );
            });
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              updateTaskResponse,
              dispatch,
              error
            );
            break;
          default:
            break;
        }
      },
      errorResponse => {
        dispatch(error(errorResponse));
        dispatch(
          alertActions.error("Failed to update task: server is not available")
        );
      }
    );
  };

  /** Update task request action creator */
  function request(taskId, task) {
    return {
      type: taskOperationsConstants.UPDATE_REQUEST,
      taskId,
      task
    };
  }

  /** Update task success action creator */
  function success(taskId, task) {
    return {
      type: taskOperationsConstants.UPDATE_SUCCESS,
      taskId,
      task
    };
  }

  /** Update task error action creator */
  function error(error) {
    return {
      type: taskOperationsConstants.UPDATE_ERROR,
      error
    };
  }

  /** Update task bad request action creator */
  function badRequest(badRequestResponseJson) {
    return {
      type: taskOperationsConstants.UPDATE_BADREQUEST,
      badRequestResponseJson
    };
  }
}
