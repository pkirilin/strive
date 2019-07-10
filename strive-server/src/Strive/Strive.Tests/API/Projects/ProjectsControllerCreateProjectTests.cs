using Microsoft.AspNetCore.Mvc;
using Strive.API.Controllers;
using Strive.Data.Dtos.Projects;
using Xunit;

namespace Strive.Tests.API.Projects
{
    public class ProjectControllerCreateProjectTests : ProjectsControllerTests
    {
        [Fact]
        public void CreateProjectReturnsBadRequestOnInvalidData()
        {
            var projectData = new ProjectCreateUpdateRequestDto();
            ProjectsController controller = this.ProjectsControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.CreateProject(projectData);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void CreateProjectReturnsOkOnCorrectData()
        {
            var projectData = new ProjectCreateUpdateRequestDto()
            {
                Id = 1,
                UserId = 1
            };

            IActionResult result = this.ProjectsControllerInstance.CreateProject(projectData);

            Assert.IsType<OkResult>(result);
        }
    }
}