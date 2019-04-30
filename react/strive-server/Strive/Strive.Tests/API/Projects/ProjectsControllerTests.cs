using Moq;
using Strive.API.Controllers;
using Strive.Data.Services;

namespace Strive.Tests.API.Projects
{
	public class ProjectsControllerTests
	{
		protected readonly Mock<IProjectService> _projectServiceMock;

		public ProjectsControllerTests()
		{
			_projectServiceMock = new Mock<IProjectService>();
		}

		public ProjectsController ProjectsControllerInstance
		{
			get
			{
				return new ProjectsController(_projectServiceMock.Object);
			}
		}
	}
}
