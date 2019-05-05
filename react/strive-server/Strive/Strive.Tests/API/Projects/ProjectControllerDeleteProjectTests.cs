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
    public class ProjectControllerDeleteProjectTests : ProjectControllerTests
    {
        [Fact]
        public void DeleteProjectReturnsStatus500IfRepoSearchFailed()
        {
            int projectId = 1;
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.DeleteProject(projectId) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(result.StatusCode, StatusCodes.Status500InternalServerError);
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
            Assert.Equal(result.StatusCode, StatusCodes.Status500InternalServerError);
        }

        [Fact]
        public void DeleteProjectReturnsBadRequestIfProjectNotFoundById()
        {
            int projectId = 1;
            _projectServiceMock.Setup(service => service.GetProjectById(projectId))
                .Returns(null as Project);

            IActionResult result = this.ProjectsControllerInstance.DeleteProject(projectId);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void DeleteProjectReturnsOkOnSuccessfulDelete()
        {
            int projectId = 1;
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetProjects().FirstOrDefault());

            IActionResult result = this.ProjectsControllerInstance.DeleteProject(projectId);

            Assert.IsType<OkObjectResult>(result);

        }
    }
}
