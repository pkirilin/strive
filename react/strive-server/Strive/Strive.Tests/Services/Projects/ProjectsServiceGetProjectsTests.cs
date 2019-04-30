using System;
using Strive.Data.Entities;
using System.Collections.Generic;
using Strive.Exceptions;
using Xunit;

namespace Strive.Tests.Services.Projects
{
	public class ProjectsServiceGetProjectsTests : ProjectServiceTests
	{
		[Fact]
		public void GetProjectsThrowsExceptionWhenDbExceptionOccurs()
		{
			int userId = 1;
			_projectRepositoryMock.Setup(repo => repo.GetAll())
				.Throws<Exception>();

			Assert.Throws<StriveDatabaseException>(() => { this.ProjectServiceInstance.GetProjects(userId); });
		}

		[Fact]
		public void GetProjectsReturnsFullCollectionForUser()
		{
			int userId = 1;
			List<Project> testProjects = GetTestProjects(userId);
			_projectRepositoryMock.Setup(repo => repo.GetAll())
				.Returns(testProjects);

			List<Project> result = this.ProjectServiceInstance.GetProjects(userId);

			Assert.Equal(testProjects, result);
		}
	}
}
