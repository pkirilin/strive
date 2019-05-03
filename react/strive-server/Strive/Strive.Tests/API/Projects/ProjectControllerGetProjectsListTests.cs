using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.API.Projects
{
	public class ProjectControllerGetProjectsListTests : ProjectControllerTests
	{
		[Fact]
		public void ProjectsControllerReturnsNotFoundResultIfServiceThrewException()
		{
			int userId = 1;
			_projectServiceMock.Setup(service => service.GetProjects(userId))
				.Throws<StriveDatabaseException>();

			IActionResult result = this.ProjectsControllerInstance.GetProjectList(userId);

			Assert.IsType<BadRequestObjectResult>(result);
		}

		[Fact]
		public void ProjectsControllerReturnsOkResultIfNoExceptionThrown()
		{
			int userId = 1;
			List<Project> testProjects = TestValuesProvider.GetProjects(userId);
			_projectServiceMock.Setup(service => service.GetProjects(userId))
				.Returns(testProjects);

			IActionResult result = this.ProjectsControllerInstance.GetProjectList(userId);

			Assert.IsType<OkObjectResult>(result);
		}
	}
}
