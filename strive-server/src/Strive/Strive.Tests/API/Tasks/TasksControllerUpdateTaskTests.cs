using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Dtos;
using Strive.Data.Entities;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.API.Tasks
{
    public class TasksControllerUpdateTaskTests : TasksControllerTests
    {
        [Fact]
        public void UpdateTaskReturnsStatus500IfRepoSearchFailed()
        {
            int taskId = 1;
            TaskDto taskData = new TaskDto();
            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.UpdateTask(taskId, taskData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void UpdateTaskReturnsStatus500IfRepoUpdateFailed()
        {
            int taskId = 1;
            TaskDto taskData = new TaskDto()
            {
                Name = "test",
                Description = "test"
            };
            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetTasks().FirstOrDefault());
            _taskServiceMock.Setup(service => service.Update(It.IsAny<Task>()))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.UpdateTask(taskId, taskData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void UpdateTaskReturnsNotFoundIfTaskNotFoundById()
        {
            int taskId = 1;
            TaskDto taskData = new TaskDto()
            {
                Name = "test",
                Description = "test"
            };
            _taskServiceMock.Setup(service => service.GetTaskById(taskId))
                .Returns(null as Task);

            IActionResult result = this.TasksControllerInstance.UpdateTask(taskId, taskData);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void UpdateTaskReturnsBadRequestOnInvalidData()
        {
            int taskId = 1;
            TaskDto taskData = new TaskDto()
            {
                Name = "test",
                Description = "test"
            };
            TasksController controller = this.TasksControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.UpdateTask(taskId, taskData);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void UpdateTaskReturnsOkOnSuccessfulUpdate()
        {
            int taskId = 1;
            TaskDto taskData = new TaskDto()
            {
                Name = "test",
                Description = "test"
            };
            _taskServiceMock.Setup(service => service.GetTaskById(taskId))
                .Returns(TestValuesProvider.GetTasks().FirstOrDefault());

            IActionResult result = this.TasksControllerInstance.UpdateTask(taskId, taskData);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
