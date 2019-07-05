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
    public class ProjectsControllerGetProjectInfoTests : ProjectsControllerTests
    {
        [Fact]
        public void GetProjectInfoReturnsStatus500IfServiceFailed()
        {
            var requestData = new ProjectInfoRequestDto()
            {
                ProjectId = 1,
                UserId = 1
            };

            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.GetProjectInfo(requestData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void GetProjectInfoReturnsNotFoundIfServiceReturnedNull()
        {
            var requestData = new ProjectInfoRequestDto()
            {
                ProjectId = 1,
                UserId = 1
            };

            _projectServiceMock.Setup(service => service.GetProjectById(requestData.ProjectId.Value))
                .Returns(null as Project);

            IActionResult result = this.ProjectsControllerInstance.GetProjectInfo(requestData);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void GetProjectInfoReturnsUnauthorizedOnWrongUser()
        {
            var requestData = new ProjectInfoRequestDto()
            {
                ProjectId = 1,
                UserId = 2
            };

            Project expectedProject = TestValuesProvider.GetProjects().FirstOrDefault();
            _projectServiceMock.Setup(service => service.GetProjectById(requestData.ProjectId.Value))
                .Returns(expectedProject);

            IActionResult result = this.ProjectsControllerInstance.GetProjectInfo(requestData);

            Assert.IsType<UnauthorizedResult>(result);
        }

        [Fact]
        public void GetProjectInfoReturnsBadRequestIfModelStateHasErrors()
        {
            var requestData = new ProjectInfoRequestDto()
            {
                ProjectId = 1,
                UserId = 1
            };

            ProjectsController controller = this.ProjectsControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.GetProjectInfo(requestData);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void GetProjectInfoReturnsOkIfProjectExists()
        {
            var requestData = new ProjectInfoRequestDto()
            {
                ProjectId = 1,
                UserId = 1
            };
            Project project = TestValuesProvider.GetProjects().FirstOrDefault();
            ProjectInfoDto expectedResult = new ProjectInfoDto()
            {
                Id = project.Id,
                Description = project.Description,
                Name = project.Name,
                UserId = project.UserId
            };
            _projectServiceMock.Setup(service => service.GetProjectById(requestData.ProjectId.Value))
                .Returns(project);
            _mapperMock.Setup(mapper => mapper.Map<Project, ProjectInfoDto>(It.IsAny<Project>()))
                .Returns(expectedResult);

            IActionResult result = this.ProjectsControllerInstance.GetProjectInfo(requestData);

            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(expectedResult, (result as OkObjectResult)?.Value);
        }
    }
}