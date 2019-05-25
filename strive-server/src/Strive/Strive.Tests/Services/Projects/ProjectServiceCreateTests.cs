using System;
using System.Linq;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.Projects
{
    public class ProjectServiceCreateTests : ProjectServiceTests
    {
        [Fact]
        public void CreateThrowsArgumentNullExceptionOnNullProject()
        {
            Project project = null;

            Assert.Throws<ArgumentNullException>(() => { this.ProjectServiceInstance.Create(project); });
        }

        [Fact]
        public void CreateThrowsDatabaseExceptionWhenRepoFailed()
        {
            Project project = TestValuesProvider.GetProjects().FirstOrDefault();
            _projectRepositoryMock.Setup(repo => repo.Add(project))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() => { this.ProjectServiceInstance.Create(project); });
        }

        [Fact]
        public void CreateReturnsProjectOnSuccess()
        {
            Project project = TestValuesProvider.GetProjects().FirstOrDefault();
            _projectRepositoryMock.Setup(repo => repo.Add(project))
                .Returns(project);

            Project result = this.ProjectServiceInstance.Create(project);

            Assert.Equal(project, result);
        }
    }
}