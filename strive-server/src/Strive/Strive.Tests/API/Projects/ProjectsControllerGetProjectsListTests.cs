using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.API.Projects
{
    public class ProjectsControllerGetProjectsListTests : ProjectsControllerTests
    {
        [Fact]
        public void ProjectsControllerReturnsStatus500IfServiceThrewException()
        {
            int userId = 1;
            _projectServiceMock.Setup(service => service.GetProjects(userId))
                .Throws<StriveDatabaseException>();

            ObjectResult result = this.ProjectsControllerInstance.GetProjectList(userId) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void ProjectsControllerReturnsOkResultIfNoExceptionThrown()
        {
            int userId = 1;
            List<Project> testProjects = TestValuesProvider.GetProjects();
            _projectServiceMock.Setup(service => service.GetProjects(userId))
                .Returns(testProjects);

            IActionResult result = this.ProjectsControllerInstance.GetProjectList(userId);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}