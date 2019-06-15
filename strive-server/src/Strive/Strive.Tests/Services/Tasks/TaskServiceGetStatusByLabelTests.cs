using System;
using Moq;
using Strive.Data.Entities;
using Strive.Exceptions;
using Xunit;

namespace Strive.Tests.Services.Tasks
{
    public class TaskServiceGetStatusByLabelTests : TaskServiceTests
    {
        [Fact]
        public void GetStatusByLabelThrowsExceptionOnRepoFail()
        {
            _taskStatusRepositoryMock.Setup(repo => 
                    repo.GetSingleOrDefault(It.IsAny<Func<TaskStatus, bool>>()))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() => { this.TaskServiceInstance.GetStatusByLabel("label"); });
        }

        [Fact]
        public void GetStatusByLabelReturnsCorrectStatus()
        {
            string expectedLabel = "label";
            _taskStatusRepositoryMock.Setup(repo =>
                    repo.GetSingleOrDefault(It.IsAny<Func<TaskStatus, bool>>()))
                .Returns(new TaskStatus()
                {
                    Label = expectedLabel
                });

            TaskStatus result = this.TaskServiceInstance.GetStatusByLabel(expectedLabel);

            Assert.Equal(expectedLabel, result.Label);
        }
    }
}
