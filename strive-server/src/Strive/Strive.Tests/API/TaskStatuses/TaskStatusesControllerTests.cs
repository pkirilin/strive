using Moq;
using Strive.API.Controllers;
using Strive.Data.Services.Interfaces;

namespace Strive.Tests.API.TaskStatuses
{
    public class TaskStatusesControllerTests
    {
        protected readonly Mock<ITaskStatusService> _taskStatusServiceMock;

        public TaskStatusesControllerTests()
        {
            _taskStatusServiceMock = new Mock<ITaskStatusService>();
        }

        public TaskStatusesController TaskStatusesControllerInstance
        {
            get
            {
                return new TaskStatusesController(_taskStatusServiceMock.Object);
            }
        }
    }
}
