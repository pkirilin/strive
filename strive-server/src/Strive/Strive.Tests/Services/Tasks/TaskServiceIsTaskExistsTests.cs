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
            string taskTitle = "test";
            int projectId = 1;
            _taskRepositoryMock.Setup(repo => repo.GetAll())
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(
                () => { this.TaskServiceInstance.IsTaskExists(taskTitle, projectId); });
        }

        [Fact]
        public void IsTaskExistsReturnsFalseWhenTaskTitleNotFound()
        {
            List<Task> testTasks = TestValuesProvider.GetTasks();
            string taskTitle = "This task doesn't exists";
            int projectId = testTasks.FirstOrDefault().ProjectId;
            _taskRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(testTasks);

            bool result = this.TaskServiceInstance.IsTaskExists(taskTitle, projectId);

            Assert.False(result);
        }

        [Fact]
        public void IsTaskExistsReturnsFalseWhenProjectIdNotFound()
        {
            List<Task> testTasks = TestValuesProvider.GetTasks();
            string taskTitle = testTasks.FirstOrDefault().Title;
            int projectId = -1;
            _taskRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(testTasks);

            bool result = this.TaskServiceInstance.IsTaskExists(taskTitle, projectId);

            Assert.False(result);
        }

        [Fact]
        public void IsTaskExistsReturnsFalseWhenTaskTitleAndProjectIdNotFound()
        {
            string taskTitle = "This task doesn't exists";
            int projectId = -1;
            _taskRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(TestValuesProvider.GetTasks());

            bool result = this.TaskServiceInstance.IsTaskExists(taskTitle, projectId);

            Assert.False(result);
        }

        [Fact]
        public void IsTaskExistsReturnsTrueWhenTaskExistsByNameAndProjectId()
        {
            List<Task> testTasks = TestValuesProvider.GetTasks();
            Task testTask = testTasks.FirstOrDefault();
            _taskRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(testTasks);

            bool result = this.TaskServiceInstance.IsTaskExists(testTask.Title, testTask.ProjectId);

            Assert.True(result);
        }
    }
}