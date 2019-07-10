using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Strive.API.Controllers;
using Strive.Data.Dtos.Tasks;
using Strive.Data.Entities;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.API.Tasks
{
    public class TasksControllerGetTaskInfoTests : TasksControllerTests
    {
        [Fact]
        public void ReturnsBadRequestIfModelStateHasErrors()
        {
            TasksController controller = this.TasksControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.GetTaskInfo(null);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void GetTaskInfoReturnsNotFoundIfServiceReturnedNull()
        {
            var request = new TaskInfoRequestDto()
            {
                TaskId = -1
            };
            _taskServiceMock.Setup(service => service.GetTaskById(request.TaskId.Value))
                .Returns(null as Task);

            IActionResult result = this.TasksControllerInstance.GetTaskInfo(request);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void GetTaskInfoReturnsOkIfTaskExists()
        {
            Task testTask = TestValuesProvider.GetTasks().FirstOrDefault();
            var request = new TaskInfoRequestDto()
            {
                TaskId = (int)testTask.Id
            };
            _taskServiceMock.Setup(service => service.GetTaskById(request.TaskId.Value))
                .Returns(testTask);

            IActionResult result = this.TasksControllerInstance.GetTaskInfo(request);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
