using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Dtos.Projects;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.API.Projects
{
    public class ProjectsControllerGetProjectsListTests : ProjectsControllerTests
    {
        [Fact]
        public void ProjectsControllerReturnsStatus500IfServiceThrewException()
        {
            var requestDto = new ProjectListRequestDto()
            {
                UserId = 1
            };

            _projectServiceMock.Setup(service => service.GetProjects(It.IsAny<int>()))
                .Throws<StriveDatabaseException>();

            ObjectResult result = this.ProjectsControllerInstance.GetProjectList(requestDto) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void ProjectsControllerReturnsBadRequestIfModelStateHasErrors()
        {
            var requestDto = new ProjectListRequestDto()
            {
                UserId = 1
            };

            ProjectsController controller = this.ProjectsControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.GetProjectList(requestDto);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void ProjectsControllerReturnsOkResultIfNoExceptionThrown()
        {
            var requestDto = new ProjectListRequestDto()
            {
                UserId = 1
            };

            List<Project> testProjects = TestValuesProvider.GetProjects();
            _projectServiceMock.Setup(service => service.GetProjects(It.IsAny<int>()))
                .Returns(testProjects);

            IActionResult result = this.ProjectsControllerInstance.GetProjectList(requestDto);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}