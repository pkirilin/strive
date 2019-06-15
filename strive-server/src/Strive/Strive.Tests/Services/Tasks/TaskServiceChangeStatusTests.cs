using System;
using System.Collections.Generic;
using System.Linq;
using Moq;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.Tasks
{
    public class TaskServiceChangeStatusTests : TaskServiceTests
    {
        [Fact]
        public void ChangeStatusThrowsExceptionOnRepoFail()
        {
            List<Task> testTasks = TestValuesProvider.GetTasks();
            TaskStatus testStatus = new TaskStatus()
            {
                Label = "test label"
            };
            _taskRepositoryMock.Setup(repo => repo.Update(testTasks))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() =>
            {
                this.TaskServiceInstance.ChangeStatus(testTasks, testStatus); 
            });
        }

        [Fact]
        public void ChangeStatusReturnsTasksWithUpdatedStatusOnSuccessfulUpdate()
        {
            List<Task> testTasks = TestValuesProvider.GetTasks();
            TaskStatus testStatus = new TaskStatus()
            {
                Label = "test label"
            };

            List<Task> result = this.TaskServiceInstance.ChangeStatus(testTasks, testStatus).ToList();

            _taskRepositoryMock.Verify(repo => repo.Update(testTasks), Times.Once);

            Assert.All(result, task =>
            {
                Assert.True(task.Status.Label == testStatus.Label);
            });
        }
    }
}
