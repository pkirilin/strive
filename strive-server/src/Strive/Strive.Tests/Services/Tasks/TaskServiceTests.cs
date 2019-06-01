using Moq;
using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Data.Services.Classes;

namespace Strive.Tests.Services.Tasks
{
    public class TaskServiceTests
    {
        protected readonly Mock<IRepository<Task>> _taskRepositoryMock;

        public TaskServiceTests()
        {
            _taskRepositoryMock = new Mock<IRepository<Task>>();
        }

        public TaskService TaskServiceInstance
        {
            get
            {
                return new TaskService(_taskRepositoryMock.Object);
            }
        }
    }
}