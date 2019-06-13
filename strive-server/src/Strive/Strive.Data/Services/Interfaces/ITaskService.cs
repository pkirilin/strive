using System.Collections.Generic;
using Strive.Data.Entities;

namespace Strive.Data.Services.Interfaces
{
    public interface ITaskService
    {
        /// <summary>
        /// Gets tasks by specified parameters
        /// </summary>
        /// <param name="projectId">Project id</param>
        /// <returns>Fetched tasks</returns>
        List<Task> GetTasks(int projectId);

        /// <summary>
        /// Gets a task entity by specified id
        /// </summary>
        /// <param name="taskId">Target task id</param>
        /// <returns>Project entity if task was found, null if not</returns>
        Task GetTaskById(int taskId);

        /// <summary>
        /// Creates a new task
        /// </summary>
        /// <param name="task">Task data</param>
        /// <returns>Created task</returns>
        void Create(Task task);

        /// <summary>
        /// Updates specified task
        /// </summary>
        /// <param name="task">Task for update</param>
        /// <returns>Updated task</returns>
        void Update(Task task);

        /// <summary>
        /// Deletes specified task
        /// </summary>
        /// <param name="task">Task for delete</param>
        /// <returns>Deleted task</returns>
        void Delete(Task task);

        /// <summary>
        /// Checks if task with specified name for specified project is already exists
        /// </summary>
        /// <param name="taskTitle">Task title</param>
        /// <param name="userId">Specified project id</param>
        bool IsTaskExists(string taskTitle, int projectId);
    }
}