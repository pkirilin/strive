using System;
using System.Linq;
using Moq;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.Projects
{
    public class ProjectServiceGetProjectByIdTests : ProjectServiceTests
    {
        [Fact]
        public void GetProjectByIdThrowsDatabaseExceptionWhenRepoFails()
        {
            int projectId = 1;
            _projectRepositoryMock.Setup(repo => repo.GetById(It.IsAny<int>()))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() =>
            {
                this.ProjectServiceInstance.GetProjectById(projectId);
            });
        }

        [Fact]
        public void GetProjectByIdReturnsNullWhenProjectNotFound()
        {
            int projectId = -1;
            _projectRepositoryMock.Setup(repo => repo.GetById(It.IsAny<int>()))
                .Returns(null as Project);

            Project result = this.ProjectServiceInstance.GetProjectById(projectId);

            Assert.Null(result);
        }

        [Fact]
        public void GetProjectByIdReturnsTargetProjectWhenProjectExists()
        {
            int projectId = 1;
            _projectRepositoryMock.Setup(repo => repo.GetById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetProjects().FirstOrDefault());

            Project result = this.ProjectServiceInstance.GetProjectById(projectId);

            Assert.NotNull(result);
            Assert.Equal(projectId, result.Id);
        }
    }
}
