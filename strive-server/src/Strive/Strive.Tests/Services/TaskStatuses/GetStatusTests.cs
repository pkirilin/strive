using System;
using System.Linq;
using Moq;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.TaskStatuses
{
	public class GetStatusTests : TaskStatusServiceTests
    {
        [Fact]
        public void ThrowsExceptionOnServiceFail()
        {
            _taskStatusRepoMock.Setup(repo => repo.GetSingleOrDefault(
                    It.IsAny<Func<TaskStatus, bool>>()))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() =>
            {
                this.TaskStatusServiceInstance.GetStatus("");
            });

            _taskStatusRepoMock.Verify(repo => repo.GetSingleOrDefault(
                It.IsAny<Func<TaskStatus, bool>>()), Times.Once);
        }

        [Fact]
        public void ReturnsNullIfStatusNotFound()
        {
            _taskStatusRepoMock.Setup(repo => repo.GetSingleOrDefault(
                    It.IsAny<Func<TaskStatus, bool>>()))
                .Returns(null as TaskStatus);

            TaskStatus result = this.TaskStatusServiceInstance.GetStatus("");

            _taskStatusRepoMock.Verify(repo => repo.GetSingleOrDefault(
                It.IsAny<Func<TaskStatus, bool>>()), Times.Once);

            Assert.Null(result);
        }

        [Fact]
        public void ReturnsStatusEntityIfStatusExists()
        {
            TaskStatus testStatus = TestValuesProvider.GetTaskStatuses().FirstOrDefault();

            _taskStatusRepoMock.Setup(repo => repo.GetSingleOrDefault(
                    It.IsAny<Func<TaskStatus, bool>>()))
                .Returns(testStatus);

            TaskStatus result = this.TaskStatusServiceInstance.GetStatus(testStatus.Label);

            _taskStatusRepoMock.Verify(repo => repo.GetSingleOrDefault(
                It.IsAny<Func<TaskStatus, bool>>()), Times.Once);

            Assert.Equal(testStatus, result);
        }
    }
}
