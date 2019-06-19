using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Dtos.Tasks;
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
            var requestParams = new GetTaskListRequestDto()
            {
                ProjectId = 1
            };

            _taskServiceMock.Setup(service => service.GetTasks(requestParams))
                .Throws<StriveDatabaseException>();

            ObjectResult result = this.TasksControllerInstance.GetTaskList(requestParams) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void TasksControllerReturnsBadRequestIfProjectIdIsNull()
        {
            var requestParams = new GetTaskListRequestDto()
            {
                ProjectId = null
            };

            IActionResult result = this.TasksControllerInstance.GetTaskList(requestParams);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void TasksControllerReturnsOkResultIfNoExceptionThrown()
        {
            var requestParams = new GetTaskListRequestDto()
            {
                ProjectId = 1
            };
            List<Task> testTasks = TestValuesProvider.GetTasks();
            _taskServiceMock.Setup(service => service.GetTasks(requestParams))
                .Returns(testTasks);

            IActionResult result = this.TasksControllerInstance.GetTaskList(requestParams);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}