﻿using System;
using System.Collections.Generic;
using System.Linq;
using Moq;
using Strive.Data.Dtos.Tasks;
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
            var requestParams = new TaskListRequestDto()
            {
                ProjectId = 1
            };
            var taskTestIds = new List<int>();
            _taskRepositoryMock.Setup(repo => repo.GetAllAsIQueryable())
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() =>
            {
                this.TaskServiceInstance.GetTasks(requestParams);
            });
            Assert.Throws<StriveDatabaseException>(() =>
            {
                this.TaskServiceInstance.GetTasks(taskTestIds);
            });
        }

        [Fact]
        public void GetTasksReturnsEntitiesForProject()
        {
            var requestParams = new TaskListRequestDto()
            {
                ProjectId = 1
            };
            List<Task> testTasks = TestValuesProvider.GetTasks();
            _taskRepositoryMock.Setup(repo => repo.GetAllAsIQueryable())
                .Returns(testTasks.AsQueryable());

            List<Task> result = this.TaskServiceInstance.GetTasks(requestParams);

            Assert.Equal(testTasks, result);
        }

        [Fact]
        public void GetTasksReturnsEntitiesMappedToIdList()
        {
            var testTasksIds = new List<int>();
            List<Task> testTasks = TestValuesProvider.GetTasks();
            foreach (var task in testTasks)
                testTasksIds.Add(task.Id);
            _taskRepositoryMock.Setup(repo => repo.GetAllAsIQueryable())
                .Returns(testTasks.AsQueryable());

            List<Task> result = this.TaskServiceInstance.GetTasks(testTasksIds.AsEnumerable())
                .ToList();

            Assert.Equal(testTasks, result);
        }

        [Fact]
        public void GetTasksReturnsFullCollectionWhenStatusAllSpecified()
        {
            var requestParams = new TaskListRequestDto()
            {
                ProjectId = 1,
                Status = "All"
            };
            List<Task> testTasks = TestValuesProvider.GetTasks();

            _taskRepositoryMock.Setup(repo => repo.GetAllAsIQueryable())
                .Returns(testTasks.AsQueryable());

            List<Task> result = this.TaskServiceInstance.GetTasks(requestParams);

            _taskRepositoryMock.Verify(repo => repo.GetAllAsIQueryable(), Times.Once);

            Assert.Equal(testTasks.Count, result.Count);
        }

        [Fact]
        public void GetTasksReturnsFullCollectionWhenStatusIsNull()
        {
            var requestParams = new TaskListRequestDto()
            {
                ProjectId = 1,
                Status = null
            };
            List<Task> testTasks = TestValuesProvider.GetTasks();

            _taskRepositoryMock.Setup(repo => repo.GetAllAsIQueryable())
                .Returns(testTasks.AsQueryable());

            List<Task> result = this.TaskServiceInstance.GetTasks(requestParams);

            _taskRepositoryMock.Verify(repo => repo.GetAllAsIQueryable(), Times.Once);

            Assert.Equal(testTasks.Count, result.Count);
        }
    }
}