using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.Data.Entities;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.API.Tasks
{
    public class TasksControllerDeleteTaskTests : TasksControllerTests
    {
        [Fact]
        public void DeleteTaskReturnsStatus500IfRepoSearchFailed()
        {
            int taskId = 1;
            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.DeleteTask(taskId) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void DeleteTaskReturnsStatus500IfRepoDeleteFailed()
        {
            int taskId = 1;
            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetTasks().FirstOrDefault());
            _taskServiceMock.Setup(service => service.Delete(It.IsAny<Task>()))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.DeleteTask(taskId) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void DeleteTaskReturnsNotFoundIfTaskNotFoundById()
        {
            int taskId = 1;
            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Returns(null as Task);

            IActionResult result = this.TasksControllerInstance.DeleteTask(taskId);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void DeleteTaskReturnsOkOnSuccessfulDelete()
        {
            int taskId = 1;
            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetTasks().FirstOrDefault());

            IActionResult result = this.TasksControllerInstance.DeleteTask(taskId);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}