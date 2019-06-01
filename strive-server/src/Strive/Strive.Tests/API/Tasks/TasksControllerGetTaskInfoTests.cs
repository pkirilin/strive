using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Entities;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.API.Tasks
{
    public class TasksControllerGetTaskInfoTests : TasksControllerTests
    {
        [Fact]
        public void GetTaskInfoReturnsStatus500IfServiceFailed()
        {
            int taskId = 1;
            _taskServiceMock.Setup(service => service.GetTaskById(taskId))
                .Throws<Exception>();

            ObjectResult result = this.TasksControllerInstance.GetTaskInfo(taskId) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void GetTaskInfoReturnsNotFoundIfServiceReturnedNull()
        {
            int taskId = -1;
            _taskServiceMock.Setup(service => service.GetTaskById(taskId))
                .Returns(null as Task);

            IActionResult result = this.TasksControllerInstance.GetTaskInfo(taskId);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void GetTaskInfoReturnsOkIfTaskExists()
        {
            Task testTask = TestValuesProvider.GetTasks().FirstOrDefault();
            _taskServiceMock.Setup(service => service.GetTaskById((int)testTask.Id))
                .Returns(testTask);

            IActionResult result = this.TasksControllerInstance.GetTaskInfo((int)testTask.Id);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
