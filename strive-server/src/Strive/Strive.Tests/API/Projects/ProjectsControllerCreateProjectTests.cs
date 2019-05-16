using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Dtos;
using Strive.Data.Entities;
using Xunit;

namespace Strive.Tests.API.Projects
{
    public class ProjectControllerCreateProjectTests : ProjectsControllerTests
    {
        [Fact]
        public void CreateProjectReturnsStatus500OnServiceException()
        {
            ProjectDto projectData = new ProjectDto();
            ProjectsController controller = this.ProjectsControllerInstance;
            _projectServiceMock.Setup(service => service.Create(It.IsAny<Project>()))
                .Throws<Exception>();

            ObjectResult result = controller.CreateProject(projectData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void CreateProjectReturnsBadRequestOnInvalidData()
        {
            ProjectDto projectData = new ProjectDto();
            ProjectsController controller = this.ProjectsControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.CreateProject(projectData);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void CreateProjectReturnsOkOnCorrectData()
        {
            ProjectDto projectData = new ProjectDto();
            ProjectsController controller = this.ProjectsControllerInstance;

            IActionResult result = controller.CreateProject(projectData);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
