using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.Data.Dtos.Projects;
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
            int userId = 1;
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.GetProjectInfo(projectId, userId) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void GetProjectInfoReturnsNotFoundIfServiceReturnedNull()
        {
            int projectId = 1;
            int userId = 1;
            _projectServiceMock.Setup(service => service.GetProjectById(projectId))
                .Returns(null as Project);

            IActionResult result = this.ProjectsControllerInstance.GetProjectInfo(projectId, userId);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void GetProjectInfoReturnsUnauthorizedOnWrongUser()
        {
            int projectId = 1;
            int userId = 2;
            Project expectedProject = TestValuesProvider.GetProjects().FirstOrDefault();
            _projectServiceMock.Setup(service => service.GetProjectById(projectId))
                .Returns(expectedProject);

            IActionResult result = this.ProjectsControllerInstance.GetProjectInfo(projectId, userId);

            Assert.IsType<UnauthorizedResult>(result);
        }

        [Fact]
        public void GetProjectInfoReturnsOkIfProjectExists()
        {
            int projectId = 1;
            int userId = 1;
            Project project = TestValuesProvider.GetProjects().FirstOrDefault();
            ProjectInfoDto expectedResult = new ProjectInfoDto()
            {
                Id = project.Id,
                Description = project.Description,
                Name = project.Name,
                UserId = project.UserId
            };
            _projectServiceMock.Setup(service => service.GetProjectById(projectId))
                .Returns(project);
            _mapperMock.Setup(mapper => mapper.Map<Project, ProjectInfoDto>(It.IsAny<Project>()))
                .Returns(expectedResult);

            IActionResult result = this.ProjectsControllerInstance.GetProjectInfo(projectId, userId);

            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(expectedResult, (result as OkObjectResult)?.Value);
        }
    }
}