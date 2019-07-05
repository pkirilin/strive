using AutoMapper;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Services.Interfaces;

namespace Strive.Tests.API.TaskStatuses
{
    public class TaskStatusesControllerTests
    {
        protected readonly Mock<IMapper> _mapperMock;

        protected readonly Mock<ITaskStatusService> _taskStatusServiceMock;

        public TaskStatusesControllerTests()
        {
            var mapperConfig = new MapperConfiguration(cfg =>
            {
				cfg.AddProfiles("Strive.API");
			});

            _mapperMock = new Mock<IMapper>();
            _taskStatusServiceMock = new Mock<ITaskStatusService>();
        }

        public TaskStatusesController TaskStatusesControllerInstance
        {
            get
            {
                return new TaskStatusesController(_taskStatusServiceMock.Object, _mapperMock.Object);
            }
        }
    }
}
