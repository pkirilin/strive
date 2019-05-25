using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.API.Tasks
{
    public class TasksControllerGetTaskListTests : TasksControllerTests
    {
        [Fact]
        public void TasksControllerReturnsStatus500IfServiceThrewException()
        {
            int projectId = 1;
            _taskServiceMock.Setup(service => service.GetTasks(projectId))
                .Throws<StriveDatabaseException>();

            ObjectResult result = this.TasksControllerInstance.GetTaskList(projectId) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void TasksControllerReturnsOkResultIfNoExceptionThrown()
        {
            int projectId = 1;
            List<Task> testTasks = TestValuesProvider.GetTasks();
            _taskServiceMock.Setup(service => service.GetTasks(projectId))
                .Returns(testTasks);

            IActionResult result = this.TasksControllerInstance.GetTaskList(projectId);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}