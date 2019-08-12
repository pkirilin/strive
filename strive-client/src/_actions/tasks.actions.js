import React from "react";
import { alertActions } from "./alert.actions";
import { taskListConstants, taskOperationsConstants } from "../_constants";
import { httpStatuses, actionHelper, historyHelper } from "../_helpers";
import { tasksService } from "../_services";
import { taskInfoConstants, taskFilterConstants } from "../_constants";

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
  update,

  /** Redux action creator, deletes an existing task */
  delete: deleteTask,

  /** Redux action creator, sets status for one or multiple tasks */
  setStatus,

  /** Redux action creator, updates task filter */
  updateFilter
};

/**
 * Redux action creator, gets tasks list from server
 * @param {Object} requestParams Parameters for filtering tasks
 */
function getList(requestParams) {
  return dispatch => {
    dispatch(request(requestParams));
    tasksService.getList(requestParams).then(
      taskListResponse => {
        switch (taskListResponse.status) {
          case httpStatuses.ok:
            taskListResponse.json().then(tasks => {
              dispatch(success(tasks));
            });
            break;
          case httpStatuses.unauthorized:
            historyHelper.redirectToLogin();
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
  function request(requestParams) {
    return {
      type: taskListConstants.GET_LIST_REQUEST,
      requestParams
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
            historyHelper.redirectToProjects();
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
            historyHelper.redirectToProjectInfo(task.projectId);
            dispatch(
              alertActions.success(
                <div>
                  Task <b>{task.title}</b> has been successfully created
                </div>
              )
            );
            break;
          case httpStatuses.unauthorized:
            historyHelper.redirectToLogin();
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
 * Redux action creator, updates an existing task
 * @param {object} task Updated task data
 */
function update(task) {
  return dispatch => {
    dispatch(request(task));
    tasksService.update(task).then(
      updateTaskResponse => {
        switch (updateTaskResponse.status) {
          case httpStatuses.ok:
            historyHelper.redirectToTaskInfo(task.id);
            dispatch(success(task));
            dispatch(
              alertActions.success(
                <div>
                  Task <b>{task.title}</b> has been successfully updated
                </div>
              )
            );
            break;
          case httpStatuses.unauthorized:
            historyHelper.redirectToLogin();
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
  function request(task) {
    return {
      type: taskOperationsConstants.UPDATE_REQUEST,
      task
    };
  }

  /** Update task success action creator */
  function success(task) {
    return {
      type: taskOperationsConstants.UPDATE_SUCCESS,
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

/**
 * Redux action creator, deletes an existing task
 * @param {Object} task Task data for delete
 */
function deleteTask(task) {
  return dispatch => {
    dispatch(request(task));
    tasksService.delete(task.id).then(
      deleteTaskResponse => {
        switch (deleteTaskResponse.status) {
          case httpStatuses.ok:
            historyHelper.redirectToProjectInfo(task.project.id);
            dispatch(success(task));
            dispatch(
              alertActions.success(
                <div>Task has been successfully deleted</div>
              )
            );
            break;
          case httpStatuses.unauthorized:
            historyHelper.redirectToLogin();
            break;
          case httpStatuses.notFound:
            deleteTaskResponse.json().then(notFoundTaskId => {
              dispatch(
                error(`Server couldn't find a task with id = ${notFoundTaskId}`)
              );
              dispatch(
                alertActions.error(
                  "Failed to delete task: server couldn't find target task"
                )
              );
            });
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              deleteTaskResponse,
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
          alertActions.error("Failed to delete task: server is not available")
        );
      }
    );
  };

  function request(task) {
    return {
      type: taskOperationsConstants.DELETE_REQUEST,
      task
    };
  }

  function success(task) {
    return {
      type: taskOperationsConstants.DELETE_SUCCESS,
      task
    };
  }

  function error(errorData) {
    return {
      type: taskOperationsConstants.DELETE_ERROR,
      errorData
    };
  }
}

/**
 * Redux action creator, sets status for one or multiple tasks
 * @param {Object} setStatusData Data for setting status: tasks and status label
 */
function setStatus(setStatusData) {
  return dispatch => {
    dispatch(request());
    tasksService.setStatus(setStatusData).then(
      setStatusResponse => {
        switch (setStatusResponse.status) {
          case httpStatuses.ok:
            dispatch(success());
            break;
          case httpStatuses.unauthorized:
            dispatch(error());
            historyHelper.redirectToLogin();
            break;
          case httpStatuses.notFound:
            setStatusResponse.json().then(notFoundStatusLabel => {
              dispatch(error());
              dispatch(
                alertActions.error(
                  <div>
                    Failed to set status: server could not find a status label
                    named
                    <b>{notFoundStatusLabel}</b>
                  </div>
                )
              );
            });
            break;
          case httpStatuses.internalServerError:
            actionHelper.handleInternalServerErrorResponse(
              setStatusResponse,
              dispatch,
              error
            );
            break;
          default:
            break;
        }
      },
      () => {
        dispatch(error());
        dispatch(
          alertActions.error("Failed to set status: server is not available")
        );
      }
    );
  };

  /** Set task status request action creator */
  function request() {
    return {
      type: taskOperationsConstants.SET_STATUS_REQUEST
    };
  }

  /** Set task status success action creator */
  function success() {
    return {
      type: taskOperationsConstants.SET_STATUS_SUCCESS
    };
  }

  /** Set task status error action creator */
  function error() {
    return {
      type: taskOperationsConstants.SET_STATUS_ERROR
    };
  }
}

/**
 * Redux action creator, updates task filter
 * @param {Object} filterValues Object containing parameters for filtering tasks
 */
function updateFilter(filterValues) {
  return (dispatch, getState) => {
    return dispatch(setFilter(filterValues)).then(() => {
      const filter = getState().tasks.filter;
      dispatch(getList(filter));
    });
  };

  function setFilter(filterValues) {
    return dispatch => {
      return new Promise(resolve => {
        dispatch(request(filterValues));
        resolve();
      });
    };

    function request(filterValues) {
      return {
        type: taskFilterConstants.UPDATE,
        filterValues
      };
    }
  }
}
