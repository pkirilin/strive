using System;
using System.Collections.Generic;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.Tasks
{
    public class TaskServiceGetTasksTests : TaskServiceTests
    {
        [Fact]
        public void GetTasksThrowsExceptionWhenDbExceptionOccurs()
        {
            int projectId = 1;
            _taskRepositoryMock.Setup(repo => repo.GetAll())
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() => { this.TaskServiceInstance.GetTasks(projectId); });
        }

        [Fact]
        public void GetTasksReturnsFullCollectionForUser()
        {
            int projectId = 1;
            List<Task> testTasks = TestValuesProvider.GetTasks();
            _taskRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(testTasks);

            List<Task> result = this.TaskServiceInstance.GetTasks(projectId);

            Assert.Equal(testTasks, result);
        }
    }
}
