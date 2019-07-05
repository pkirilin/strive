using AutoMapper;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Services.Interfaces;

namespace Strive.Tests.API.Tasks
{
    public class TasksControllerTests
    {
        protected readonly Mock<IMapper> _mapperMock;

        protected readonly Mock<ITaskService> _taskServiceMock;

        protected readonly Mock<ITaskStatusService> _taskStatusServiceMock;

        public TasksControllerTests()
        {
            var mapperConfig = new MapperConfiguration(cfg =>
            {
				cfg.AddProfiles("Strive.API");
			});

            _mapperMock = new Mock<IMapper>();
            _taskServiceMock = new Mock<ITaskService>();
            _taskStatusServiceMock = new Mock<ITaskStatusService>();
        }

        public TasksController TasksControllerInstance
        {
            get
            {
                return new TasksController(
                    _taskServiceMock.Object,
                    _taskStatusServiceMock.Object,
                    _mapperMock.Object);
            }
        }
    }
}