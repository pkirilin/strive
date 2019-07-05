﻿using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.API.Controllers;
using Xunit;

namespace Strive.Tests.API.TaskStatuses
{
    public class GetStatusTabsTests : TaskStatusesControllerTests
    {
        [Fact]
        public void ReturnsStatus500IfServiceFailed()
        {
            int projectId = 1;

            _taskStatusServiceMock.Setup(service => service.GetStatusTabs(It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.TaskStatusesControllerInstance.GetStatusTabs(projectId) as ObjectResult;

            _taskStatusServiceMock.Verify(service => service.GetStatusTabs(It.IsAny<int>()), Times.Once);

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void ReturnsBadRequestIfModelStateHasErrors()
        {
            int projectId = 1;

            TaskStatusesController controller = this.TaskStatusesControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.GetStatusTabs(projectId);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void ReturnsOkOnServiceSuccess()
        {
            int projectId = 1;

            IActionResult result = this.TaskStatusesControllerInstance.GetStatusTabs(projectId);

            _taskStatusServiceMock.Verify(service => service.GetStatusTabs(It.IsAny<int>()), Times.Once);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
