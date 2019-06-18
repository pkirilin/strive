using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Data.Services.Interfaces;
using Strive.Exceptions;

namespace Strive.Data.Services.Classes
{
    public class TaskService : ITaskService
    {
        private readonly IRepository<Task> _taskRepo;

        private readonly IRepository<TaskStatus> _taskStatusRepo;

        public TaskService(IRepository<Task> taskRepo, IRepository<TaskStatus> taskStatusRepo)
        {
            _taskRepo = taskRepo;
            _taskStatusRepo = taskStatusRepo;
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
                return _taskRepo.GetAllAsIQueryable()
                    .Include(task => task.Status)
                    .Where(task => task.ProjectId == projectId)
                    .OrderBy(task => task.Title)
                    .ToList();
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to get tasks from database. Error message: {e.Message}");
            }
        }

        /// <summary>
        /// Gets task entities mapped to specified IDs
        /// </summary>
        /// <param name="taskIds">A collection of IDs</param>
        /// <returns>Fetched tasks</returns>
        public IEnumerable<Task> GetTasks(IEnumerable<int> taskIds)
        {
            try
            {
                return _taskRepo.GetAllAsIQueryable()
                    .Where(task => taskIds.Contains(task.Id))
                    .AsEnumerable();
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
                return _taskRepo.GetAllAsIQueryable()
                    .Include(task => task.Project)
                    .Include(task => task.Status)
                    .SingleOrDefault(task => task.Id == taskId);
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
        /// <param name="taskTitle">Task title</param>
        /// <param name="userId">Specified project id</param>
        public bool IsTaskExists(string taskTitle, int projectId)
        {
            try
            {
                Task targetTask = _taskRepo.GetAllAsIQueryable()
                    .Where(task => task.Title == taskTitle && task.ProjectId == projectId)
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

        /// <summary>
        /// Gets a status entity by its label
        /// </summary>
        /// <param name="label">Status label</param>
        /// <returns>Status entity</returns>
        public TaskStatus GetStatusByLabel(string label)
        {
            try
            {
                return _taskStatusRepo.GetSingleOrDefault(status => status.Label == label);
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to get task status. Error message: {e.Message}");
            }
        }

        /// <summary>
        /// Changes status for a collection of tasks
        /// </summary>
        /// <param name="tasks">Tasks marked for status change</param>
        /// <param name="status">New status</param>
        /// <returns>Tasks with changed status</returns>
        public IEnumerable<Task> ChangeStatus(IEnumerable<Task> tasks, TaskStatus status)
        {
            try
            {
                foreach (Task task in tasks)
                    task.Status = status;
                _taskRepo.Update(tasks);
                return tasks;
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to change task status. Error message: {e.Message}");
            }
        }
    }
}