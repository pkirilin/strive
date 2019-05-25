using System;
using System.Collections.Generic;
using System.Linq;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.Tasks
{
    public class TaskServiceIsTaskExistsTests : TaskServiceTests
    {
        [Fact]
        public void IsTaskExistsThrowsDatabaseExceptionWhenRepoFails()
        {
            string taskName = "test";
            int projectId = 1;
            _taskRepositoryMock.Setup(repo => repo.GetAll())
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(
                () => { this.TaskServiceInstance.IsTaskExists(taskName, projectId); });
        }

        [Fact]
        public void IsTaskExistsReturnsFalseWhenTaskNameNotFound()
        {
            List<Task> testTasks = TestValuesProvider.GetTasks();
            string taskName = "This task doesn't exists";
            int projectId = testTasks.FirstOrDefault().ProjectId;
            _taskRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(testTasks);

            bool result = this.TaskServiceInstance.IsTaskExists(taskName, projectId);

            Assert.False(result);
        }

        [Fact]
        public void IsTaskExistsReturnsFalseWhenProjectIdNotFound()
        {
            List<Task> testTasks = TestValuesProvider.GetTasks();
            string taskName = testTasks.FirstOrDefault().Name;
            int projectId = -1;
            _taskRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(testTasks);

            bool result = this.TaskServiceInstance.IsTaskExists(taskName, projectId);

            Assert.False(result);
        }

        [Fact]
        public void IsTaskExistsReturnsFalseWhenTaskNameAndProjectIdNotFound()
        {
            string taskName = "This task doesn't exists";
            int projectId = -1;
            _taskRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(TestValuesProvider.GetTasks());

            bool result = this.TaskServiceInstance.IsTaskExists(taskName, projectId);

            Assert.False(result);
        }

        [Fact]
        public void IsTaskExistsReturnsTrueWhenTaskExistsByNameAndProjectId()
        {
            List<Task> testTasks = TestValuesProvider.GetTasks();
            Task testTask = testTasks.FirstOrDefault();
            _taskRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(testTasks);

            bool result = this.TaskServiceInstance.IsTaskExists(testTask.Name, testTask.ProjectId);

            Assert.True(result);
        }
    }
}