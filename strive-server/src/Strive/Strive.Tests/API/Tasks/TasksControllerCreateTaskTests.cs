using System;
using Microsoft.AspNetCore.Http;
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
        public void CreateTaskReturnsStatus500OnServiceGetStatusException()
        {
            var taskData = new TaskCreateUpdateRequestDto();

            _taskStatusServiceMock.Setup(service => service.GetStatus(It.IsAny<string>()))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.CreateTask(taskData) as ObjectResult;

            _taskStatusServiceMock.Verify(service => service.GetStatus(It.IsAny<string>()), Times.Once);

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void CreateTaskReturnsNotFoundIfStatusNotFound()
        {
            var taskData = new TaskCreateUpdateRequestDto() { Status = "status"};

            _taskStatusServiceMock.Setup(service => service.GetStatus(It.IsAny<string>()))
                .Returns(null as TaskStatus);

            IActionResult result = this.TasksControllerInstance.CreateTask(taskData);

            _taskStatusServiceMock.Verify(service => service.GetStatus(It.IsAny<string>()), Times.Once);

            Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(taskData.Status, (result as NotFoundObjectResult)?.Value);
        }

        [Fact]
        public void CreateTaskReturnsStatus500OnServiceCreateException()
        {
            var taskData = new TaskCreateUpdateRequestDto();
            var foundStatus = new TaskStatus();

            _taskStatusServiceMock.Setup(service => service.GetStatus(It.IsAny<string>()))
                .Returns(foundStatus);
            _taskServiceMock.Setup(service => service.Create(It.IsAny<Task>()))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.CreateTask(taskData) as ObjectResult;

            _taskStatusServiceMock.Verify(service => service.GetStatus(It.IsAny<string>()), Times.Once);

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
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