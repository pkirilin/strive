using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Strive.Tests.API.TaskStatuses
{
    public class GetStatusesTests : TaskStatusesControllerTests
    {
        [Fact]
        public void ReturnsStatus500IfServiceFailed()
        {
            _taskStatusServiceMock.Setup(service => service.GetStatuses())
                .Throws<Exception>();

            ObjectResult result = this.TaskStatusesControllerInstance.GetStatuses() as ObjectResult;

            _taskStatusServiceMock.Verify(service => service.GetStatuses(), Times.Once);

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void ReturnsOkOnServiceSuccess()
        {
            IActionResult result = this.TaskStatusesControllerInstance.GetStatuses();

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
