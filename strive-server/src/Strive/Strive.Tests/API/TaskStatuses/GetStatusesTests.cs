using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Strive.Tests.API.TaskStatuses
{
	public class GetStatusesTests : TaskStatusesControllerTests
    {
        [Fact]
        public void ReturnsOkOnServiceSuccess()
        {
            IActionResult result = this.TaskStatusesControllerInstance.GetStatuses();

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
