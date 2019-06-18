using System.Collections.Generic;
using Strive.Data.Dtos.TaskStatuses;

namespace Strive.Data.Services.Interfaces
{
    public interface ITaskStatusService
    {
        /// <summary>
        /// Gets status label and tasks count for each status inside one project
        /// </summary>
        /// <param name="projectId">Id of project for counting tasks</param>
        /// <returns>A collection of status labels and their task amounts</returns>
        IEnumerable<TaskStatusTabDto> GetStatusTabs(int projectId);
    }
}
