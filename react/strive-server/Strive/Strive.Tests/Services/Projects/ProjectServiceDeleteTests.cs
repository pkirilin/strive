using System;
using Strive.Data.Entities;
using Strive.Exceptions;
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
            Project project = new Project()
            {
                Name = "Test project",
                Description = ""
            };
            _projectRepositoryMock.Setup(repo => repo.Remove(project))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() => { this.ProjectServiceInstance.Delete(project); });
        }
    }
}
