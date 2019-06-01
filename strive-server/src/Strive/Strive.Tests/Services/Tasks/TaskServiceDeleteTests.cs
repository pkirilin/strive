using System;
using System.Linq;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.Tasks
{
    public class TaskServiceDeleteTests : TaskServiceTests
    {
        [Fact]
        public void DeleteThrowsArgumentNullExceptionOnNullTask()
        {
            Task task = null;

            Assert.Throws<ArgumentNullException>(() => { this.TaskServiceInstance.Delete(task); });
        }

        [Fact]
        public void DeleteThrowsDatabaseExceptionWhenRepoFailed()
        {
            Task task = TestValuesProvider.GetTasks().FirstOrDefault();
            _taskRepositoryMock.Setup(repo => repo.Delete(task))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() => { this.TaskServiceInstance.Delete(task); });
        }
    }
}