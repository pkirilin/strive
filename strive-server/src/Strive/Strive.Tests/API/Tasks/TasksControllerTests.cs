using AutoMapper;
using Moq;
using Strive.API;
using Strive.API.Controllers;
using Strive.Data.Services.Interfaces;

namespace Strive.Tests.API.Tasks
{
    public class TasksControllerTests
    {
        protected readonly Mock<IMapper> _mapperMock;

        protected readonly Mock<ITaskService> _taskServiceMock;

        public TasksControllerTests()
        {
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            });

            _mapperMock = new Mock<IMapper>();
            _taskServiceMock = new Mock<ITaskService>();
        }

        public TasksController TasksControllerInstance
        {
            get
            {
                return new TasksController(_taskServiceMock.Object, _mapperMock.Object);
            }
        }
    }
}
