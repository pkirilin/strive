using System;
using System.Linq;
using Moq;
using Strive.Data.Entities;
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
            int projectId = 1;
            _projectRepositoryMock.Setup(repo => repo.GetAll())
                .Throws<Exception>();
            _projectRepositoryMock.Setup(repo => repo.GetById(It.IsAny<object>()))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() =>
            {
                this.ProjectServiceInstance.IsProjectExists(projectName, userId);
            });

            Assert.Throws<StriveDatabaseException>(() =>
            {
                this.ProjectServiceInstance.IsProjectExists(projectId);
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
        public void IsProjectExistsReturnsFalseWhenProjectNotFoundById()
        {
            int projectId = -1;
            _projectRepositoryMock.Setup(repo => repo.GetById(It.IsAny<object>()))
                .Returns(null as Project);

            bool result = this.ProjectServiceInstance.IsProjectExists(projectId);

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

        [Fact]
        public void IsProjectExistsReturnsTrueWhenProjectExistsById()
        {
            int projectId = 1;
            _projectRepositoryMock.Setup(repo => repo.GetById(It.IsAny<object>()))
                .Returns(TestValuesProvider.GetProjects().FirstOrDefault());

            bool result = this.ProjectServiceInstance.IsProjectExists(projectId);

            Assert.True(result);
        }
    }
}
