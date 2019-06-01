using System;
using System.Collections.Generic;
using System.Linq;
using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Data.Services.Interfaces;
using Strive.Exceptions;

namespace Strive.Data.Services.Classes
{
    public class TaskService : ITaskService
    {
        private readonly IRepository<Task> _taskRepo;

        public TaskService(IRepository<Task> taskRepo)
        {
            _taskRepo = taskRepo;
        }

        /// <summary>
        /// Gets tasks by specified parameters
        /// </summary>
        /// <param name="projectId">Project id</param>
        /// <returns>Fetched tasks</returns>
        public List<Task> GetTasks(int projectId)
        {
            try
            {
                return _taskRepo.GetAll()
                    .Where(task => task.ProjectId == projectId)
                    .ToList();
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to get tasks from database. Error message: {e.Message}");
            }
        }

        /// <summary>
        /// Gets a task entity by specified id
        /// </summary>
        /// <param name="taskId">Target task id</param>
        /// <returns>Project entity if task was found, null if not</returns>
        public Task GetTaskById(int taskId)
        {
            try
            {
                return _taskRepo.GetById(taskId);
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to get task by id. Error message: {e.Message}");
            }
        }

        /// <summary>
        /// Creates a new task
        /// </summary>
        /// <param name="task">Task data</param>
        /// <returns>Created task</returns>
        public void Create(Task task)
        {
            if (task == null)
                throw new ArgumentNullException("Failed to create task. Task cannot be null");

            try
            {
                _taskRepo.Insert(task);
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to create task. Error message: {e.Message}");
            }
        }

        /// <summary>
        /// Updates specified task
        /// </summary>
        /// <param name="task">Task for update</param>
        /// <returns>Updated task</returns>
        public void Update(Task task)
        {
            if (task == null)
                throw new ArgumentNullException("Failed to update task. Updated task cannot be null");

            try
            {
                _taskRepo.Update(task);
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to update task. Error message: {e.Message}");
            }
        }

        /// <summary>
        /// Deletes specified task
        /// </summary>
        /// <param name="task">Task for delete</param>
        /// <returns>Deleted task</returns>
        public void Delete(Task task)
        {
            if (task == null)
                throw new ArgumentNullException("Failed to delete task. Task cannot be null");

            try
            {
                _taskRepo.Delete(task);
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to delete task. Error message: {e.Message}");
            }
        }

        /// <summary>
        /// Checks if task with specified name for specified project is already exists
        /// </summary>
        /// <param name="taskName">Task name</param>
        /// <param name="userId">Specified project id</param>
        public bool IsTaskExists(string taskName, int projectId)
        {
            try
            {
                Task targetTask = _taskRepo.GetAll()
                    .Where(task => task.Name == taskName && task.ProjectId == projectId)
                    .FirstOrDefault();

                if (targetTask == null)
                    return false;
                return true;
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Cannot check if task is exists. Error message: {e.Message}");
            }
        }
    }
}