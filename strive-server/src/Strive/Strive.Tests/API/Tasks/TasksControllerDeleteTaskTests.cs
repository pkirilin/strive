using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.Data.Dtos.Tasks;
using Strive.Data.Entities;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.API.Tasks
{
    public class TasksControllerDeleteTaskTests : TasksControllerTests
    {
        [Fact]
        public void DeleteTaskReturnsNotFoundIfTaskNotFoundById()
        {
            var request = new TaskDeleteRequestDto()
            {
                TaskId = 1
            };
            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Returns(null as Task);

            IActionResult result = this.TasksControllerInstance.DeleteTask(request);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void DeleteTaskReturnsOkOnSuccessfulDelete()
        {
            var request = new TaskDeleteRequestDto()
            {
                TaskId = 1
            };
            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetTasks().FirstOrDefault());

            IActionResult result = this.TasksControllerInstance.DeleteTask(request);

            Assert.IsType<OkResult>(result);
        }
    }
}