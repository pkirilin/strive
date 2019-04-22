import { projectListConstants } from "../_constants";

/** Contains Redux action creators for actions related to projects */
export const projectsActions = {
  getAll,
  add
};

function getAll() {
  return dispatch => {
    let projects = [
      {
        key: 1,
        name: "First"
      },
      {
        key: 2,
        name: "Second"
      },
      {
        key: 3,
        name: "Third"
      }
    ];
    dispatch(success(projects));
  };

  // function request() {}

  function success(projects) {
    return {
      type: projectListConstants.GET_ALL_SUCCESS,
      projects
    };
  }

  // function error() {}
}

function add(project) {
  return dispatch => {
    dispatch(success(project));
  };

  function success(project) {
    return {
      type: projectListConstants.ADD_SUCCESS,
      project
    };
  }
}
