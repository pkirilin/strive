using System;
using System.Linq;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.Projects
{
    public class ProjectServiceUpdateTests : ProjectServiceTests
    {
        [Fact]
        public void UpdateThrowsArgumentNullExceptionOnNullProject()
        {
            Project project = null;

            Assert.Throws<ArgumentNullException>(() => { this.ProjectServiceInstance.Update(project); });
        }

        [Fact]
        public void UpdateThrowsDatabaseExceptionWhenRepoFailed()
        {
            Project project = TestValuesProvider.GetProjects().FirstOrDefault();
            _projectRepositoryMock.Setup(repo => repo.Update(project))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() => { this.ProjectServiceInstance.Update(project); });
        }

        [Fact]
        public void UpdateReturnsProjectOnSuccess()
        {
            Project project = TestValuesProvider.GetProjects().FirstOrDefault();
            _projectRepositoryMock.Setup(repo => repo.Update(project))
                .Returns(project);

            Project result = this.ProjectServiceInstance.Update(project);

            Assert.Equal(project, result);
        }
    }
}
