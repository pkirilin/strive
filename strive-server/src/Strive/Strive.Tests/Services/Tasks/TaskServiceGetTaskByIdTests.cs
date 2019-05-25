using System;
using System.Linq;
using Moq;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.Tasks
{
    public class TaskServiceGetTaskByIdTests : TaskServiceTests
    {
        [Fact]
        public void GetTaskByIdThrowsDatabaseExceptionWhenRepoFails()
        {
            int taskId = 1;
            _taskRepositoryMock.Setup(repo => repo.GetById(taskId))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() => { this.TaskServiceInstance.GetTaskById(taskId); });
        }

        [Fact]
        public void GetTaskByIdReturnsNullWhenTaskNotFound()
        {
            int taskId = -1;
            _taskRepositoryMock.Setup(repo => repo.GetById(It.IsAny<int>()))
                .Returns(null as Task);

            Task result = this.TaskServiceInstance.GetTaskById(taskId);

            Assert.Null(result);
        }

        [Fact]
        public void GetTaskByIdReturnsTargetTaskWhenTaskExists()
        {
            Task expectedTask = TestValuesProvider.GetTasks().FirstOrDefault();
            _taskRepositoryMock.Setup(repo => repo.GetById(expectedTask.Id))
                .Returns(expectedTask);

            Task resultTask = this.TaskServiceInstance.GetTaskById(expectedTask.Id);

            Assert.Equal(expectedTask.Id, resultTask.Id);
        }
    }
}