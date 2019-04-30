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
	}
}
