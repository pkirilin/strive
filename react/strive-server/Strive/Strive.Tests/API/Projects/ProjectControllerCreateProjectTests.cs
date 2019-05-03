using System;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Dtos;
using Strive.Data.Entities;
using Xunit;

namespace Strive.Tests.API.Projects
{
    public class ProjectControllerCreateProjectTests : ProjectControllerTests
    {
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
        public void CreateProjectReturnsBadRequestOnServiceException()
        {
            ProjectDto projectData = new ProjectDto();
            ProjectsController controller = this.ProjectsControllerInstance;
            _projectServiceMock.Setup(service => service.Create(It.IsAny<Project>()))
                .Throws<Exception>();

            IActionResult result = controller.CreateProject(projectData);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void CreateProjectReturnsOkOnCorrectData()
        {
            ProjectDto projectData = new ProjectDto();
            ProjectsController controller = this.ProjectsControllerInstance;

            IActionResult result = controller.CreateProject(projectData);

            Assert.IsType<OkResult>(result);
        }
    }
}
