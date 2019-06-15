using System.Collections.Generic;
using Strive.Data.Dtos.Tasks;
using Strive.Data.Entities;

namespace Strive.Tests.TestValues
{
    public static class TestValuesProvider
    {
        public static List<Project> GetProjects()
        {
            return new List<Project>()
            {
                new Project()
                {
                    Id = 1,
                    Name = "Test 1 name",
                    Description = "Test 1 description",
                    UserId = 1
                },
                new Project()
                {
                    Id = 2,
                    Name = "Test 2 name",
                    Description = "Test 2 description",
                    UserId = 1
                }
            };
        }

        public static List<Task> GetTasks()
        {
            return new List<Task>()
            {
                new Task()
                {
                    Id = 1,
                    Title = "Test task title 1",
                    Description = "Test task description 1",
                    ProjectId = 1,
                    StatusId = 1
                },
                new Task()
                {
                    Id = 2,
                    Title = "Test task title 2",
                    Description = "Test task description 2",
                    ProjectId = 1,
                    StatusId = 1
                }
            };
        }

        public static List<TaskListItemDto> GetTaskListItems()
        {
            return new List<TaskListItemDto>()
            {
                new TaskListItemDto()
                {
                    Id = 1,
                    Title = "Test task title 1",
                    Description = "Test task description 1",
                    ProjectId = 1,
                    Checked = true
                },
                new TaskListItemDto()
                {
                    Id = 2,
                    Title = "Test task title 2",
                    Description = "Test task description 2",
                    ProjectId = 1,
                    Checked = true
                }
            };
        }
    }
}