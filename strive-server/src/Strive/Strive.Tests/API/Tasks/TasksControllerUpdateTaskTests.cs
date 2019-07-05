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
                Title = "test",
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
        public void UpdateTaskReturnsStatus500IfRepoGetStatusFailed()
        {
            var oldStatus = new TaskStatus() { Label = "old status" };
            var newStatus = new TaskStatus() { Label = "new status" };
            var taskData = new TaskCreateUpdateDto() { Status = newStatus.Label };
            var mappedTask = new Task() { Status = oldStatus };

            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetTasks().FirstOrDefault());
            _mapperMock.Setup(mapper => mapper.Map(It.IsAny<TaskCreateUpdateDto>(), It.IsAny<Task>()))
                .Returns(mappedTask);
            _taskStatusServiceMock.Setup(service => service.GetStatus(taskData.Status))
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
                Title = "test",
                Description = "test",
            };
            _taskServiceMock.Setup(service => service.GetTaskById(taskData.Id.Value))
                .Returns(null as Task);

            IActionResult result = this.TasksControllerInstance.UpdateTask(taskData);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void UpdateTaskReturnsNotFoundIfStatusNotFound()
        {
            var oldStatus = new TaskStatus() { Label = "old status" };
            var newStatus = new TaskStatus() { Label = "new status" };
            var taskData = new TaskCreateUpdateDto()
            {
                Id = 1,
                Status = newStatus.Label,
                ProjectId = 1
            };
            var mappedTask = new Task() { Status = oldStatus };

            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetTasks().FirstOrDefault());
            _mapperMock.Setup(mapper => mapper.Map(It.IsAny<TaskCreateUpdateDto>(), It.IsAny<Task>()))
                .Returns(mappedTask);
            _taskStatusServiceMock.Setup(service => service.GetStatus(taskData.Status))
                .Returns(null as TaskStatus);

            IActionResult result = this.TasksControllerInstance.UpdateTask(taskData);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void UpdateTaskReturnsBadRequestOnInvalidData()
        {
            var taskData = new TaskCreateUpdateDto()
            {
                Title = "test",
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
                Title = "test",
                Description = "test",
                Status = "status"
            };
            var mappedTask = new Task()
            {
                Status = new TaskStatus() { Label = "status" }
            };

            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetTasks().FirstOrDefault());
            _mapperMock.Setup(mapper => mapper.Map(It.IsAny<TaskCreateUpdateDto>(), It.IsAny<Task>()))
                .Returns(mappedTask);

            IActionResult result = this.TasksControllerInstance.UpdateTask(taskData);

            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public void UpdateTaskChangesStatusSuccessfully()
        {
            var oldStatus = new TaskStatus() { Label = "old status" };
            var newStatus = new TaskStatus() { Label = "newStatus" };

            var taskData = new TaskCreateUpdateDto()
            {
                Id = 1,
                Title = "test",
                Description = "test",
                Status = newStatus.Label
            };
            
            var mappedTask = new Task() { Status = oldStatus };
            var taskWithUpdatedStatus = new Task() { Status = newStatus };

            _mapperMock.Setup(mapper => mapper.Map(It.IsAny<TaskCreateUpdateDto>(), It.IsAny<Task>()))
                .Returns(mappedTask);
            _taskServiceMock.Setup(service => service.GetTaskById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetTasks().FirstOrDefault());
            _taskStatusServiceMock.Setup(service => service.GetStatus(taskData.Status))
                .Returns(newStatus);

            IActionResult result = this.TasksControllerInstance.UpdateTask(taskData);

            Assert.IsType<OkResult>(result);
        }
    }
}