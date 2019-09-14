using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Dtos.Tasks;
using Strive.Data.Entities;
using Xunit;

namespace Strive.Tests.API.Tasks
{
    public class TasksControllerCreateTaskTests : TasksControllerTests
    {
        [Fact]
        public void CreateTaskReturnsNotFoundIfStatusNotFound()
        {
            var taskData = new TaskCreateUpdateRequestDto() { Status = "status"};

            _taskStatusServiceMock.Setup(service => service.GetStatus(It.IsAny<string>()))
                .Returns(null as TaskStatus);

            IActionResult result = this.TasksControllerInstance.CreateTask(taskData);

            _taskStatusServiceMock.Verify(service => service.GetStatus(It.IsAny<string>()), Times.Once);

            Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal($"Failed to create task: status \"{taskData.Status}\" doesn't exist", (result as NotFoundObjectResult)?.Value);
        }

        [Fact]
        public void CreateTaskReturnsBadRequestOnInvalidData()
        {
            TasksController controller = this.TasksControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.CreateTask(new TaskCreateUpdateRequestDto());

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void CreateTaskReturnsOkOnCorrectData()
        {
            var taskData = new TaskCreateUpdateRequestDto();
            var foundStatus = new TaskStatus();
            var taskEntity = new Task();

            _mapperMock.Setup(mapper => mapper.Map<Task>(taskData))
                .Returns(taskEntity);
            _taskStatusServiceMock.Setup(service => service.GetStatus(It.IsAny<string>()))
                .Returns(foundStatus);

            IActionResult result = this.TasksControllerInstance.CreateTask(taskData);

            _taskStatusServiceMock.Verify(service => service.GetStatus(It.IsAny<string>()), Times.Once);

            Assert.IsType<OkResult>(result);
        }
    }
}