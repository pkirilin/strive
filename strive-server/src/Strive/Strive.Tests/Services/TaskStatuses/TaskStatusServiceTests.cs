using Moq;
using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Data.Services.Classes;
using Strive.Data.Services.Interfaces;

namespace Strive.Tests.Services.TaskStatuses
{
    public class TaskStatusServiceTests
    {
        protected readonly Mock<IRepository<TaskStatus>> _taskStatusRepoMock;

        public TaskStatusServiceTests()
        {
            _taskStatusRepoMock = new Mock<IRepository<TaskStatus>>();
        }

        public ITaskStatusService TaskStatusServiceInstance
        {
            get
            {
                return new TaskStatusService(_taskStatusRepoMock.Object);
            }
        }
    }
}
