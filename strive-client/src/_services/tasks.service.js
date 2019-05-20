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
  // Fake implementation for testing
  return new Promise(resolve => {
    resolve([
      {
        id: 0,
        name: "test 1",
        checked: false
      },
      {
        id: 1,
        name: "test 2",
        checked: false
      }
    ]);
  });
}
