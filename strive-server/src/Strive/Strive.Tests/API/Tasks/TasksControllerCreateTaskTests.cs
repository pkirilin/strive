using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Dtos;
using Strive.Data.Entities;
using Xunit;

namespace Strive.Tests.API.Tasks
{
    public class TasksControllerCreateTaskTests : TasksControllerTests
    {
        [Fact]
        public void CreateTaskReturnsStatus500OnServiceCreateException()
        {
            var taskData = new TaskCreateUpdateDto();
            _taskServiceMock.Setup(service => service.Create(It.IsAny<Task>()))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.CreateTask(taskData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void CreateTaskReturnsStatus500OnServiceIsTaskExistsException()
        {
            var taskData = new TaskCreateUpdateDto();
            _taskServiceMock.Setup(service => service.IsTaskExists(It.IsAny<string>(), It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.CreateTask(taskData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void CreateTaskReturnsBadRequestOnInvalidData()
        {
            TasksController controller = this.TasksControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.CreateTask(new TaskCreateUpdateDto());

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void CreateTaskReturnsOkOnCorrectData()
        {
            var taskData = new TaskCreateUpdateDto();

            IActionResult result = this.TasksControllerInstance.CreateTask(taskData);

            Assert.IsType<OkResult>(result);
        }
    }
}