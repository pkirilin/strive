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
    public class ProjectsControllerUpdateProjectTests : ProjectsControllerTests
    {
        [Fact]
        public void UpdateProjectReturnsStatus500IfRepoSearchFailed()
        {
            var projectData = new ProjectCreateUpdateRequestDto()
            {
                Name = "Test",
                Description = "Test",
                UserId = 1
            };
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.UpdateProject(projectData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(result.StatusCode, StatusCodes.Status500InternalServerError);
        }

        [Fact]
        public void UpdateProjectReturnsStatus500IfRepoUpdateFailed()
        {
            var projectData = new ProjectCreateUpdateRequestDto()
            {
                Id = 1,
                Name = "Test",
                Description = "Test",
                UserId = 1
            };
            _projectServiceMock.Setup(service => service.GetProjectById(projectData.Id.Value))
                .Returns(TestValuesProvider.GetProjects().FirstOrDefault());
            _projectServiceMock.Setup(service => service.IsProjectExists(projectData.Name, projectData.UserId.Value))
                .Returns(false);
            _projectServiceMock.Setup(service => service.Update(It.IsAny<Project>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.UpdateProject(projectData) as ObjectResult;

            _projectServiceMock.Verify(service => service.GetProjectById(projectData.Id.Value), Times.Once);
            _projectServiceMock.Verify(service => service.IsProjectExists(projectData.Name, projectData.UserId.Value), Times.Once);
            _projectServiceMock.Verify(service => service.Update(It.IsAny<Project>()), Times.Once);

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void UpdateProjectReturnsStatus500IfRepoProjectExistsCheckFailed()
        {
            var projectData = new ProjectCreateUpdateRequestDto()
            {
                Id = 1,
                Name = "Test",
                Description = "Test",
                UserId = 1
            };
            _projectServiceMock.Setup(service => service.GetProjectById(projectData.Id.Value))
                .Returns(TestValuesProvider.GetProjects().FirstOrDefault());
            _projectServiceMock.Setup(service => service.IsProjectExists(It.IsAny<string>(), It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.UpdateProject(projectData) as ObjectResult;

            _projectServiceMock.Verify(service => service.GetProjectById(projectData.Id.Value), Times.Once);
            _projectServiceMock.Verify(service => service.IsProjectExists(projectData.Name, projectData.UserId.Value), Times.Once);

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void UpdateProjectReturnsNotFoundIfProjectNotFoundById()
        {
            var projectData = new ProjectCreateUpdateRequestDto()
            {
                Id = 1,
                Name = "Test",
                Description = "Test",
                UserId = 1
            };
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Returns(null as Project);

            IActionResult result = this.ProjectsControllerInstance.UpdateProject(projectData);

            _projectServiceMock.Verify(service => service.GetProjectById(projectData.Id.Value), Times.Once);
            _projectServiceMock.Verify(service => service.IsProjectExists(projectData.Name, projectData.UserId.Value), Times.Never);
            _projectServiceMock.Verify(service => service.Update(It.IsAny<Project>()), Times.Never);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void UpdateProjectReturnsBadRequestOnInvalidData()
        {
            var projectData = new ProjectCreateUpdateRequestDto()
            {
                Id = 1,
                Name = "Test",
                Description = "Test",
                UserId = 1
            };
            ProjectsController controller = this.ProjectsControllerInstance;
            controller.ModelState.AddModelError("error", "error");
            _projectServiceMock.Setup(service => service.GetProjectById(projectData.Id.Value))
                .Returns(TestValuesProvider.GetProjects().FirstOrDefault());

            IActionResult result = controller.UpdateProject(projectData);

            _projectServiceMock.Verify(service => service.GetProjectById(projectData.Id.Value), Times.Once);
            _projectServiceMock.Verify(service => service.IsProjectExists(projectData.Name, projectData.UserId.Value), Times.Never);
            _projectServiceMock.Verify(service => service.Update(It.IsAny<Project>()), Times.Never);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void UpdateProjectReturnsOkOnSuccessfulUpdate()
        {
            var projectData = new ProjectCreateUpdateRequestDto()
            {
                Id = 1,
                Name = "Test",
                Description = "Test",
                UserId = 1
            };
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetProjects().FirstOrDefault());

            IActionResult result = this.ProjectsControllerInstance.UpdateProject(projectData);

            _projectServiceMock.Verify(service => service.GetProjectById(projectData.Id.Value), Times.Once);
            _projectServiceMock.Verify(service => service.IsProjectExists(projectData.Name, projectData.UserId.Value), Times.Once);
            _projectServiceMock.Verify(service => service.Update(It.IsAny<Project>()), Times.Once);

            Assert.IsType<OkResult>(result);
        }
    }
}