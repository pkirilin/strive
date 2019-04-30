using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Entities;
using Xunit;

namespace Strive.Tests.API.Projects
{
	public class ProjectsControllerGetProjectsListTests : ProjectsControllerTests
	{
		[Fact]
		public void ReturnsFullCollectionForUser()
		{
			int userId = 0;
			List<Project> testProjects = new List<Project>()
			{
				new Project()
				{
					Name = "Test 1 name",
					Description = "Test 1 description",
					UserId = userId
				},
				new Project()
				{
					Name = "Test 2 name",
					Description = "Test 2 description",
					UserId = userId
				}
			};
			_projectServiceMock.Setup(service => service.GetProjects(userId))
				.Returns(testProjects);

			IActionResult result = this.ProjectsControllerInstance.GetProjectList(userId);

			Assert.IsType<OkObjectResult>(result);
		}
	}
}
