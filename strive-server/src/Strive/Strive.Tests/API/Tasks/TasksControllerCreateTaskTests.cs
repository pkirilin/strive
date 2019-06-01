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
        public void CreateTaskReturnsStatus500OnServiceException()
        {
            TaskDto taskData = new TaskDto();
            _taskServiceMock.Setup(service => service.Create(It.IsAny<Task>()))
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

            IActionResult result = controller.CreateTask(new TaskDto());

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void CreateTaskReturnsOkOnCorrectData()
        {
            IActionResult result = this.TasksControllerInstance.CreateTask(new TaskDto());

            Assert.IsType<OkResult>(result);
        }
    }
}