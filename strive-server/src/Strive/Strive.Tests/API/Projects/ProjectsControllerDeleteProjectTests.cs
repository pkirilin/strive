using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Dtos.Projects;
using Strive.Data.Entities;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.API.Projects
{
    public class ProjectsControllerDeleteProjectTests : ProjectsControllerTests
    {
        [Fact]
        public void DeleteProjectReturnsStatus500IfRepoSearchFailed()
        {
            var request = new ProjectDeleteRequestDto()
            {
                ProjectId = 1
            };
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.DeleteProject(request) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void DeleteProjectReturnsStatus500IfRepoDeleteFailed()
        {
            var request = new ProjectDeleteRequestDto()
            {
                ProjectId = 1
            };
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetProjects().FirstOrDefault());
            _projectServiceMock.Setup(service => service.Delete(It.IsNotNull<Project>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.DeleteProject(request) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void DeleteProjectReturnsNotFoundIfProjectNotFoundById()
        {
            var request = new ProjectDeleteRequestDto()
            {
                ProjectId = 1
            };
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Returns(null as Project);

            IActionResult result = this.ProjectsControllerInstance.DeleteProject(request);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void DeleteProjectReturnsBadRequestIfModelStateHasErrors()
        {
            var request = new ProjectDeleteRequestDto()
            {
                ProjectId = 1
            };

            ProjectsController controller = this.ProjectsControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.DeleteProject(request);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void DeleteProjectReturnsOkOnSuccessfulDelete()
        {
            var request = new ProjectDeleteRequestDto()
            {
                ProjectId = 1
            };
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetProjects().FirstOrDefault());

            IActionResult result = this.ProjectsControllerInstance.DeleteProject(request);

            Assert.IsType<OkResult>(result);
        }
    }
}