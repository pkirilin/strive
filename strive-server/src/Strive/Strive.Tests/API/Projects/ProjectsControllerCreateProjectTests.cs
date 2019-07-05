using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Dtos.Projects;
using Strive.Data.Entities;
using Xunit;

namespace Strive.Tests.API.Projects
{
    public class ProjectControllerCreateProjectTests : ProjectsControllerTests
    {
        [Fact]
        public void CreateProjectReturnsStatus500OnServiceCreateException()
        {
            var projectData = new ProjectCreateUpdateDto();
            ProjectsController controller = this.ProjectsControllerInstance;
            _projectServiceMock.Setup(service => service.Create(It.IsAny<Project>()))
                .Throws<Exception>();

            ObjectResult result = controller.CreateProject(projectData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void CreateProjectReturnsStatus500OnServiceIsProjectExistsException()
        {
            var projectData = new ProjectCreateUpdateDto();
            ProjectsController controller = this.ProjectsControllerInstance;
            _projectServiceMock.Setup(service => service.IsProjectExists(It.IsAny<string>(), It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = controller.CreateProject(projectData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void CreateProjectReturnsBadRequestOnInvalidData()
        {
            var projectData = new ProjectCreateUpdateDto();
            ProjectsController controller = this.ProjectsControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.CreateProject(projectData);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void CreateProjectReturnsOkOnCorrectData()
        {
            var projectData = new ProjectCreateUpdateDto()
            {
                Id = 1,
                UserId = 1
            };

            IActionResult result = this.ProjectsControllerInstance.CreateProject(projectData);

            Assert.IsType<OkResult>(result);
        }
    }
}