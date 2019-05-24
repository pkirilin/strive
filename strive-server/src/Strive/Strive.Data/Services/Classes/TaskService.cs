﻿using System;
using System.Collections.Generic;
using System.Linq;
using Strive.Data.Entities;
using Strive.Data.Repositories.Interfaces;
using Strive.Data.Services.Interfaces;
using Strive.Exceptions;

namespace Strive.Data.Services.Classes
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepo;

        public TaskService(ITaskRepository taskRepo)
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
        /// Creates a new task
        /// </summary>
        /// <param name="task">Task data</param>
        /// <returns>Created task</returns>
        public Task Create(Task task)
        {
            if (task == null)
                throw new ArgumentNullException("Failed to create task. Task cannot be null");

            try
            {
                return _taskRepo.Add(task);
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
        public Task Update(Task task)
        {
            if (task == null)
                throw new ArgumentNullException("Failed to update task. Updated task cannot be null");

            try
            {
                return _taskRepo.Update(task);
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
        public Task Delete(Task task)
        {
            if (task == null)
                throw new ArgumentNullException("Failed to delete task. Task cannot be null");

            try
            {
                return _taskRepo.Remove(task);
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to delete task. Error message: {e.Message}");
            }
        }
    }
}