using Moq;
using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Data.Services;
using System.Collections.Generic;

namespace Strive.Tests.Services.Projects
{
	public class ProjectServiceTests
	{
		protected readonly Mock<IProjectRepository> _projectRepositoryMock;

		public ProjectServiceTests()
		{
			_projectRepositoryMock = new Mock<IProjectRepository>();
		}

		public ProjectService ProjectServiceInstance
		{
			get
			{
				return new ProjectService(_projectRepositoryMock.Object);
			}
		}

		protected List<Project> GetTestProjects(int userId = 1)
		{
			return new List<Project>()
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
		}
	}
}
