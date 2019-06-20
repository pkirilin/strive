using System;
using System.Collections.Generic;
using System.Linq;
using Moq;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.Services.TaskStatuses
{
    public class GetStatusesTests : TaskStatusServiceTests
    {
        [Fact]
        public void ThrowsExceptionWhenRepoFails()
        {
            _taskStatusRepoMock.Setup(repo => repo.GetAllAsIQueryable())
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() =>
            {
                this.TaskStatusServiceInstance.GetStatuses();
            });

            _taskStatusRepoMock.Verify(repo => repo.GetAllAsIQueryable(), Times.Once);
        }

        [Fact]
        public void ReturnsTaskStatusCollectionOnRepoSuccess()
        {
            List<TaskStatus> testStatuses = TestValuesProvider.GetTaskStatuses();

            _taskStatusRepoMock.Setup(repo => repo.GetAllAsIQueryable())
                .Returns(testStatuses.AsQueryable());

            List<TaskStatus> result = this.TaskStatusServiceInstance.GetStatuses().ToList();

            _taskStatusRepoMock.Verify(repo => repo.GetAllAsIQueryable(), Times.Once);

            Assert.Equal(testStatuses, result);
        }
    }
}
