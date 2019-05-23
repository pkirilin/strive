using System;
using System.Linq;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.Tasks
{
    public class TaskServiceCreateTests : TaskServiceTests
    {
        [Fact]
        public void CreateThrowsArgumentNullExceptionOnNullTask()
        {
            Task task = null;

            Assert.Throws<ArgumentNullException>(() => { this.TaskServiceInstance.Create(task); });
        }

        [Fact]
        public void CreateThrowsDatabaseExceptionWhenRepoFailed()
        {
            Task task = TestValuesProvider.GetTasks().FirstOrDefault();
            _taskRepositoryMock.Setup(repo => repo.Add(task))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() => { this.TaskServiceInstance.Create(task); });
        }

        [Fact]
        public void CreateReturnsTaskOnSuccess()
        {
            Task task = TestValuesProvider.GetTasks().FirstOrDefault();
            _taskRepositoryMock.Setup(repo => repo.Add(task))
                .Returns(task);

            Task result = this.TaskServiceInstance.Create(task);

            Assert.Equal(task, result);
        }
    }
}
