using System;
using System.Linq;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.Projects
{
    public class ProjectServiceDeleteTests : ProjectServiceTests
    {
        [Fact]
        public void DeleteThrowsArgumentNullExceptionOnNullProject()
        {
            Project project = null;

            Assert.Throws<ArgumentNullException>(() => { this.ProjectServiceInstance.Delete(project); });
        }

        [Fact]
        public void DeleteThrowsDatabaseExceptionWhenRepoFailed()
        {
            Project project = TestValuesProvider.GetProjects().FirstOrDefault();
            _projectRepositoryMock.Setup(repo => repo.Remove(project))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() => { this.ProjectServiceInstance.Delete(project); });
        }

        [Fact]
        public void DeleteReturnsProjectOnSuccess()
        {
            Project project = TestValuesProvider.GetProjects().FirstOrDefault();
            _projectRepositoryMock.Setup(repo => repo.Remove(project))
                .Returns(project);

            Project result = this.ProjectServiceInstance.Delete(project);

            Assert.Equal(project, result);
        }
    }
}