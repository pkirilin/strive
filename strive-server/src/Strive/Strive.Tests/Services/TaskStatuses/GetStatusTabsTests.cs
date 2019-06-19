using System;
using System.Collections.Generic;
using System.Linq;
using Moq;
using Strive.Data.Dtos.TaskStatuses;
using Strive.Data.Entities;
using Strive.Exceptions;
using Xunit;

namespace Strive.Tests.Services.TaskStatuses
{
    public class GetStatusTabsTests : TaskStatusServiceTests
    {
        [Fact]
        public void ThrowsExceptionWhenRepoFails()
        {
            int projectId = 1;

            _taskStatusRepoMock.Setup(repo => repo.GetAllAsIQueryable())
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() =>
            {
                this.TaskStatusServiceInstance.GetStatusTabs(projectId);
            });

            _taskStatusRepoMock.Verify(repo => repo.GetAllAsIQueryable(), Times.Once);
        }

        [Fact]
        public void ReturnsCorrectInfo()
        {
            int projectId = 1;
            var testData = new List<TaskStatus>()
            {
                new TaskStatus()
                {
                    Id = 1,
                    Label = "status 1",
                    Tasks = new List<Task>()
                    {
                        new Task() { ProjectId = 1 },
                        new Task() { ProjectId = 1 }
                    }
                },
                new TaskStatus()
                {
                    Id = 2,
                    Label = "status 2",
                    Tasks = new List<Task>()
                    {
                        new Task() { ProjectId = 1 },
                        new Task() { ProjectId = 2 }
                    }
                },
                new TaskStatus()
                {
                    Id = 3,
                    Label = "status 3",
                    Tasks = new List<Task>()
                }
            };

            _taskStatusRepoMock.Setup(repo => repo.GetAllAsIQueryable())
                .Returns(testData.AsQueryable());

            List<TaskStatusTabDto> result = this.TaskStatusServiceInstance.GetStatusTabs(projectId).ToList();
            List<TaskStatusTabDto> resultWithoutAllStatusesTabInfo = new List<TaskStatusTabDto>(result);
            resultWithoutAllStatusesTabInfo.RemoveAt(resultWithoutAllStatusesTabInfo.Count - 1);
            TaskStatusTabDto allStatusesTabInfoExpected = new TaskStatusTabDto()
            {
                Index = 3,
                Status = "All",
                CountTasks = 3
            };
            TaskStatusTabDto allStatusesTabInfoActual = result[result.Count - 1];

            _taskStatusRepoMock.Verify(repo => repo.GetAllAsIQueryable(), Times.Once);

            Assert.All(resultWithoutAllStatusesTabInfo, statusTabDto =>
            {
                Assert.Contains(testData,
                    status => status.Label == statusTabDto.Status
                              && status.Tasks
                                  .Count(task => task.ProjectId == projectId) 
                              == statusTabDto.CountTasks);
            });
            Assert.Equal(allStatusesTabInfoExpected.Index, allStatusesTabInfoActual.Index);
            Assert.Equal(allStatusesTabInfoExpected.Status, allStatusesTabInfoActual.Status);
            Assert.Equal(allStatusesTabInfoExpected.CountTasks, allStatusesTabInfoActual.CountTasks);
        }
    }
}
