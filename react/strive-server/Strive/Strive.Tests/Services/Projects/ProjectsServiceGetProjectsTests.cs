using Strive.Data.Entities;
using System.Collections.Generic;
using Xunit;

namespace Strive.Tests.Services.Projects
{
	public class ProjectsServiceGetProjectsTests : ProjectServiceTests
	{
		[Fact]
		void GetProjectsReturnsFullCollectionForUser()
		{
			int userId = 1;
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
			_projectRepositoryMock.Setup(repo => repo.GetAll())
				.Returns(testProjects);

			List<Project> result = this.ProjectServiceInstance.GetProjects(userId);

			Assert.Equal(testProjects, result);
		}
	}
}
