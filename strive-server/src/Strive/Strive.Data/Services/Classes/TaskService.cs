﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Strive.Data.Dtos.Tasks;
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
        /// <param name="requestParams">Specified parameters</param>
        /// <returns>Fetched tasks</returns>
        public List<Task> GetTasks(TaskListRequestDto requestParams)
        {
            try
            {
                var tasks = _taskRepo.GetAllAsIQueryable()
                    .Include(task => task.Status)
                    .Where(task => task.ProjectId == requestParams.ProjectId);

                tasks = requestParams.Status == null || requestParams.Status == "All" ? tasks : 
                    tasks.Where(task => task.Status.Label == requestParams.Status);

                tasks = tasks.OrderBy(task => task.Title);

                return tasks.ToList();
            }
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to get task list from database");
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
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to get task list from database");
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
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to get task from database");
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
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to create task");
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
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to update task");
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
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to delete task");
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
                var targetTask = _taskRepo.GetAllAsIQueryable()
                    .Where(task => task.Title == taskTitle && task.ProjectId == projectId)
                    .FirstOrDefault();

                if (targetTask == null)
                    return false;
                return true;
            }
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to check if task exists");
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
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to get task status");
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
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to change task status");
            }
        }
    }
}