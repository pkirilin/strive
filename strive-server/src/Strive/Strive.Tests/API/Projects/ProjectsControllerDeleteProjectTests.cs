using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
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
            int projectId = 1;
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.DeleteProject(projectId) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void DeleteProjectReturnsStatus500IfRepoDeleteFailed()
        {
            int projectId = 1;
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetProjects().FirstOrDefault());
            _projectServiceMock.Setup(service => service.Delete(It.IsNotNull<Project>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.DeleteProject(projectId) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void DeleteProjectReturnsNotFoundIfProjectNotFoundById()
        {
            int projectId = 1;
            _projectServiceMock.Setup(service => service.GetProjectById(projectId))
                .Returns(null as Project);

            IActionResult result = this.ProjectsControllerInstance.DeleteProject(projectId);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void DeleteProjectReturnsOkOnSuccessfulDelete()
        {
            int projectId = 1;
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetProjects().FirstOrDefault());

            IActionResult result = this.ProjectsControllerInstance.DeleteProject(projectId);

            Assert.IsType<OkResult>(result);
        }
    }
}