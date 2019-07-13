using Microsoft.AspNetCore.Mvc;
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
