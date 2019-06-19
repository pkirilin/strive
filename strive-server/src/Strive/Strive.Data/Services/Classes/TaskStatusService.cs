using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Strive.Data.Dtos.TaskStatuses;
using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Data.Services.Interfaces;
using Strive.Exceptions;

namespace Strive.Data.Services.Classes
{
    public class TaskStatusService : ITaskStatusService
    {
        private readonly IRepository<TaskStatus> _taskStatusRepo;

        public TaskStatusService(IRepository<TaskStatus> taskStatusRepo)
        {
            _taskStatusRepo = taskStatusRepo;
        }

        /// <summary>
        /// Gets status label and tasks count for each status inside one project
        /// </summary>
        /// <param name="projectId">Id of project for counting tasks</param>
        /// <returns>A collection of status labels and their task amounts</returns>
        public IEnumerable<TaskStatusTabDto> GetStatusTabs(int projectId)
        {
            try
            {
                var statusTabsInfo = new List<TaskStatusTabDto>();

                var statuses = _taskStatusRepo.GetAllAsIQueryable()
                    .Include(status => status.Tasks)
                    .OrderBy(status => status.Id);

                int curIndex = -1;
                int allTasksCount = 0;

                foreach (var status in statuses)
                {
                    int countTasksForCurStatus = status.Tasks.Count(task => task.ProjectId == projectId);
                    statusTabsInfo.Add(new TaskStatusTabDto()
                    {
                        Index = ++curIndex,
                        Status = status.Label,
                        CountTasks = countTasksForCurStatus
                    });
                    allTasksCount += countTasksForCurStatus;
                }

                statusTabsInfo.Add(new TaskStatusTabDto()
                {
                    Index = ++curIndex,
                    Status = "All",
                    CountTasks = allTasksCount
                });

                return statusTabsInfo;
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to get data for task status tabs. Error message: {e.Message}");
            }
        }
    }
}
