using System.Collections.Generic;
using Strive.Data.Entities;

namespace Strive.Data.Services.Interfaces
{
    public interface ITaskService
    {
        List<Task> GetTasks(int projectId);

        Task Create(Task task);

        Task Update(Task task);

        Task Delete(Task task);
    }
}
