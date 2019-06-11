using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Dtos.Tasks;
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
            var taskData = new TaskCreateUpdateDto();
            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.UpdateTask(taskData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void UpdateTaskReturnsStatus500IfRepoUpdateFailed()
        {
            var taskData = new TaskCreateUpdateDto()
            {
                Name = "test",
                Description = "test"
            };
            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetTasks().FirstOrDefault());
            _taskServiceMock.Setup(service => service.Update(It.IsAny<Task>()))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.UpdateTask(taskData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void UpdateTaskReturnsNotFoundIfTaskNotFoundById()
        {
            var taskData = new TaskCreateUpdateDto()
            {
                Id = 1,
                Name = "test",
                Description = "test",
            };
            _taskServiceMock.Setup(service => service.GetTaskById(taskData.Id))
                .Returns(null as Task);

            IActionResult result = this.TasksControllerInstance.UpdateTask(taskData);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void UpdateTaskReturnsBadRequestOnInvalidData()
        {
            var taskData = new TaskCreateUpdateDto()
            {
                Name = "test",
                Description = "test"
            };
            TasksController controller = this.TasksControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.UpdateTask(taskData);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void UpdateTaskReturnsOkOnSuccessfulUpdate()
        {
            var taskData = new TaskCreateUpdateDto()
            {
                Id = 1,
                Name = "test",
                Description = "test"
            };
            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetTasks().FirstOrDefault());

            IActionResult result = this.TasksControllerInstance.UpdateTask(taskData);

            Assert.IsType<OkResult>(result);
        }
    }
}