using System;
using Moq;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.Projects
{
    public class ProjectServiceIsProjectExistsTests : ProjectServiceTests
    {
        [Fact]
        public void IsProjectExistsThrowsDatabaseExceptionWhenRepoFails()
        {
            string projectName = "Test 1 name";
            int userId = 1;
            _projectRepositoryMock.Setup(repo => repo.GetAll())
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() =>
            {
                this.ProjectServiceInstance.IsProjectExists(projectName, userId);
            });
        }

        [Fact]
        public void IsProjectExistsReturnsFalseWhenProjectNameNotFound()
        {
            string projectName = "This project doesn't exists";
            int userId = 1;
            _projectRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(TestValuesProvider.GetProjects());

            bool result = this.ProjectServiceInstance.IsProjectExists(projectName, userId);

            Assert.False(result);
        }

        [Fact]
        public void IsProjectExistsReturnsFalseWhenUserIdNotFound()
        {
            string projectName = "Test 1 name";
            int actualUserId = 2;
            _projectRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(TestValuesProvider.GetProjects());

            bool result = this.ProjectServiceInstance.IsProjectExists(projectName, actualUserId);

            Assert.False(result);
        }

        [Fact]
        public void IsProjectExistsReturnsFalseWhenProjectNameAndUserIdNotFound()
        {
            string projectName = "This project doesn't exists";
            int actualUserId = 2;
            _projectRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(TestValuesProvider.GetProjects());

            bool result = this.ProjectServiceInstance.IsProjectExists(projectName, actualUserId);

            Assert.False(result);
        }

        [Fact]
        public void IsProjectExistsReturnsTrueWhenProjectExistsByNameAndUserId()
        {
            string projectName = "Test 1 name";
            int userId = 1;
            _projectRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(TestValuesProvider.GetProjects());

            bool result = this.ProjectServiceInstance.IsProjectExists(projectName, userId);

            Assert.True(result);
        }
    }
}
