using Moq;
using Strive.Data.Repositories.Interfaces;
using Strive.Data.Services.Classes;

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
            get { return new ProjectService(_projectRepositoryMock.Object); }
        }
    }
}