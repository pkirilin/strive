using System;
using Strive.Data.Entities;
using Strive.Exceptions;
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
            Project project = new Project()
            {
                Name = "Test project",
                Description = ""
            };
            _projectRepositoryMock.Setup(repo => repo.Add(project))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() => { this.ProjectServiceInstance.Create(project); });
        }

        [Fact]
        public void CreateReturnsProjectOnSuccess()
        {
            Project project = new Project()
            {
                Name = "Test project",
                Description = ""
            };
            _projectRepositoryMock.Setup(repo => repo.Add(project))
                .Returns(project);

            Project result = this.ProjectServiceInstance.Create(project);

            Assert.Equal(project, result);
        }
    }
}
