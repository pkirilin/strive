using System;
using System.Linq;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.Tasks
{
    public class TaskServiceUpdateTests : TaskServiceTests
    {
        [Fact]
        public void UpdateThrowsArgumentNullExceptionOnNullTask()
        {
            Task task = null;

            Assert.Throws<ArgumentNullException>(() => { this.TaskServiceInstance.Update(task); });
        }

        [Fact]
        public void UpdateThrowsDatabaseExceptionWhenRepoFailed()
        {
            Task task = TestValuesProvider.GetTasks().FirstOrDefault();
            _taskRepositoryMock.Setup(repo => repo.Update(task))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() => { this.TaskServiceInstance.Update(task); });
        }
    }
}