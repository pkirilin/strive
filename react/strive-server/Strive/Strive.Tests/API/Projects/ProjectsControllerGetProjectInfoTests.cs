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
    public class ProjectsControllerGetProjectInfoTests : ProjectsControllerTests
    {
        [Fact]
        public void GetProjectInfoReturnsStatus500IfServiceFailed()
        {
            int projectId = 1;
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.GetProjectInfo(projectId) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(result.StatusCode, StatusCodes.Status500InternalServerError);
        }

        [Fact]
        public void GetProjectInfoReturnsNotFoundIfServiceReturnedNull()
        {
            int projectId = 1;
            _projectServiceMock.Setup(service => service.GetProjectById(projectId))
                .Returns(null as Project);

            IActionResult result = this.ProjectsControllerInstance.GetProjectInfo(projectId);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void GetProjectInfoReturnsOkIfProjectExists()
        {
            int projectId = 1;
            Project expectedProject = TestValuesProvider.GetProjects().FirstOrDefault();
            _projectServiceMock.Setup(service => service.GetProjectById(projectId))
                .Returns(expectedProject);

            IActionResult result = this.ProjectsControllerInstance.GetProjectInfo(projectId);

            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(expectedProject, (result as OkObjectResult)?.Value);
        }
    }
}
