using System;
using System.Collections.Generic;
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
    public class TasksControllerSetStatusTests : TasksControllerTests
    {
        [Fact]
        public void SetStatusReturnsStatus500OnGetTasksException()
        {
            var setStatusData = new SetTaskStatusDto()
            {
                Status = "test status",
                Tasks = TestValuesProvider.GetTaskListItems()
            };

            _taskServiceMock.Setup(service => service.GetTasks(It.IsAny<IEnumerable<int>>()))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.SetStatus(setStatusData) as ObjectResult;

            _taskServiceMock.Verify(service => service.GetTasks(It.IsAny<IEnumerable<int>>()), Times.Once);
            _taskServiceMock.Verify(service => service.GetStatusByLabel(It.IsAny<string>()), Times.Never);
            _taskServiceMock.Verify(service => service.ChangeStatus(It.IsAny<IEnumerable<Task>>(), It.IsAny<TaskStatus>()), Times.Never);

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void SetStatusReturnsStatus500OnGetStatusByLabelException()
        {
            var setStatusData = new SetTaskStatusDto()
            {
                Status = "test status",
                Tasks = TestValuesProvider.GetTaskListItems()
            };

            _taskServiceMock.Setup(service => service.GetTasks(It.IsAny<IEnumerable<int>>()))
                .Returns(TestValuesProvider.GetTasks());
            _taskServiceMock.Setup(service => service.GetStatusByLabel(setStatusData.Status))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.SetStatus(setStatusData) as ObjectResult;

            _taskServiceMock.Verify(service => service.GetTasks(It.IsAny<IEnumerable<int>>()), Times.Once);
            _taskServiceMock.Verify(service => service.GetStatusByLabel(setStatusData.Status), Times.Once);
            _taskServiceMock.Verify(service => service.ChangeStatus(It.IsAny<IEnumerable<Task>>(), It.IsAny<TaskStatus>()), Times.Never);

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void SetStatusReturnsStatus500OnChangeStatusException()
        {
            var setStatusData = new SetTaskStatusDto()
            {
                Status = "test status",
                Tasks = TestValuesProvider.GetTaskListItems()
            };
            List<Task> mappedTestTasks = TestValuesProvider.GetTasks();
            var foundStatus = new TaskStatus()
            {
                Label = setStatusData.Status
            };

            _taskServiceMock.Setup(service => service.GetTasks(It.IsAny<IEnumerable<int>>()))
                .Returns(mappedTestTasks);
            _taskServiceMock.Setup(service => service.GetStatusByLabel(setStatusData.Status))
                .Returns(foundStatus);
            _taskServiceMock.Setup(service => service.ChangeStatus(mappedTestTasks, foundStatus))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.SetStatus(setStatusData) as ObjectResult;

            _taskServiceMock.Verify(service => service.GetTasks(It.IsAny<IEnumerable<int>>()), Times.Once);
            _taskServiceMock.Verify(service => service.GetStatusByLabel(setStatusData.Status), Times.Once);
            _taskServiceMock.Verify(service => service.ChangeStatus(mappedTestTasks, foundStatus), Times.Once);

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void SetStatusReturnsNotFoundWhenStatusNotExists()
        {
            var setStatusData = new SetTaskStatusDto()
            {
                Status = "test status",
                Tasks = TestValuesProvider.GetTaskListItems()
            };
            List<Task> mappedTestTasks = TestValuesProvider.GetTasks();

            _taskServiceMock.Setup(service => service.GetTasks(It.IsAny<IEnumerable<int>>()))
                .Returns(mappedTestTasks);
            _taskServiceMock.Setup(service => service.GetStatusByLabel(setStatusData.Status))
                .Returns(null as TaskStatus);

            IActionResult result = this.TasksControllerInstance.SetStatus(setStatusData);

            _taskServiceMock.Verify(service => service.GetTasks(It.IsAny<IEnumerable<int>>()), Times.Once);
            _taskServiceMock.Verify(service => service.GetStatusByLabel(setStatusData.Status), Times.Once);
            _taskServiceMock.Verify(service => service.ChangeStatus(It.IsAny<IEnumerable<Task>>(), It.IsAny<TaskStatus>()), Times.Never);

            Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(setStatusData.Status, (result as NotFoundObjectResult)?.Value);
        }

        [Fact]
        public void SetStatusReturnsBadRequestIfModelStateHasErrors()
        {
            var setStatusData = new SetTaskStatusDto()
            {
                Status = "test status",
                Tasks = TestValuesProvider.GetTaskListItems()
            };
            TasksController controller = this.TasksControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.SetStatus(setStatusData);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void SetStatusReturnsOkOnChangeStatusSuccess()
        {
            var setStatusData = new SetTaskStatusDto()
            {
                Status = "test status",
                Tasks = TestValuesProvider.GetTaskListItems()
            };
            List<Task> mappedTestTasks = TestValuesProvider.GetTasks();
            var foundStatus = new TaskStatus()
            {
                Label = setStatusData.Status
            };

            _taskServiceMock.Setup(service => service.GetTasks(It.IsAny<IEnumerable<int>>()))
                .Returns(mappedTestTasks);
            _taskServiceMock.Setup(service => service.GetStatusByLabel(setStatusData.Status))
                .Returns(foundStatus);

            IActionResult result = this.TasksControllerInstance.SetStatus(setStatusData);

            _taskServiceMock.Verify(service => service.GetTasks(It.IsAny<IEnumerable<int>>()), Times.Once);
            _taskServiceMock.Verify(service => service.GetStatusByLabel(setStatusData.Status), Times.Once);
            _taskServiceMock.Verify(service => service.ChangeStatus(mappedTestTasks, foundStatus), Times.Once);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
