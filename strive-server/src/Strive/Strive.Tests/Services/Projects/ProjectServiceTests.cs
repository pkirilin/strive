using Moq;
using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Data.Services.Classes;

namespace Strive.Tests.Services.Projects
{
    public class ProjectServiceTests
    {
        protected readonly Mock<IRepository<Project>> _projectRepositoryMock;

        public ProjectServiceTests()
        {
            _projectRepositoryMock = new Mock<IRepository<Project>>();
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