using Moq;
using Strive.Data.Repositories.Interfaces;
using Strive.Data.Services.Classes;

namespace Strive.Tests.Services.Tasks
{
    public class TaskServiceTests
    {
        protected readonly Mock<ITaskRepository> _taskRepositoryMock;

        public TaskServiceTests()
        {
            _taskRepositoryMock = new Mock<ITaskRepository>();
        }

        public TaskService TaskServiceInstance
        {
            get { return new TaskService(_taskRepositoryMock.Object); }
        }
    }
}