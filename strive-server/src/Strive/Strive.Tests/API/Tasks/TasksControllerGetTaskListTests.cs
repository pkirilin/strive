﻿using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Strive.API.Controllers;
using Strive.Data.Dtos.Tasks;
using Strive.Data.Entities;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.API.Tasks
{
    public class TasksControllerGetTaskListTests : TasksControllerTests
    {
        [Fact]
        public void TasksControllerReturnsBadRequestIfModelStateHasErrors()
        {
            var requestParams = new TaskListRequestDto();

            TasksController controller = this.TasksControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.GetTaskList(requestParams);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void TasksControllerReturnsOkResultIfNoExceptionThrown()
        {
            var requestParams = new TaskListRequestDto()
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