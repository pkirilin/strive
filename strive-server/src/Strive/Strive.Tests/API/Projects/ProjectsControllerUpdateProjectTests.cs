﻿using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Dtos;
using Strive.Data.Entities;
using Strive.Tests.TestValues;
using Xunit;

namespace Strive.Tests.API.Projects
{
    public class ProjectsControllerUpdateProjectTests : ProjectsControllerTests
    {
        [Fact]
        public void UpdateProjectReturnsStatus500IfRepoSearchFailed()
        {
            int projectId = 1;
            ProjectListItemDto projectData = new ProjectListItemDto()
            {
                Name = "Test",
                Description = "Test",
                UserId = 1
            };
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.UpdateProject(projectId, projectData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(result.StatusCode, StatusCodes.Status500InternalServerError);
        }

        [Fact]
        public void UpdateProjectReturnsStatus500IfRepoUpdateFailed()
        {
            int projectId = 1;
            ProjectListItemDto projectData = new ProjectListItemDto()
            {
                Name = "Test",
                Description = "Test",
                UserId = 1
            };
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetProjects().FirstOrDefault());
            _projectServiceMock.Setup(service => service.Update(It.IsAny<Project>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.UpdateProject(projectId, projectData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void UpdateProjectReturnsStatus500IfRepoProjectExistsCheckFailed()
        {
            int projectId = 1;
            ProjectListItemDto projectData = new ProjectListItemDto()
            {
                Name = "Test",
                Description = "Test",
                UserId = 1
            };
            _projectServiceMock.Setup(service => service.IsProjectExists(It.IsAny<string>(), It.IsAny<int>()))
                .Throws<Exception>();

            ObjectResult result = this.ProjectsControllerInstance.UpdateProject(projectId, projectData) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void UpdateProjectReturnsNotFoundIfProjectNotFoundById()
        {
            int projectId = 1;
            ProjectListItemDto projectData = new ProjectListItemDto()
            {
                Name = "Test",
                Description = "Test",
                UserId = 1
            };
            _projectServiceMock.Setup(service => service.GetProjectById(projectId))
                .Returns(null as Project);

            IActionResult result = this.ProjectsControllerInstance.UpdateProject(projectId, projectData);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void UpdateProjectReturnsBadRequestOnInvalidData()
        {
            int projectId = 1;
            ProjectListItemDto projectData = new ProjectListItemDto()
            {
                Name = "Test",
                Description = "Test",
                UserId = 1
            };
            ProjectsController controller = this.ProjectsControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.UpdateProject(projectId, projectData);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void UpdateProjectReturnsOkOnSuccessfulUpdate()
        {
            int projectId = 1;
            ProjectListItemDto projectData = new ProjectListItemDto()
            {
                Name = "Test",
                Description = "Test",
                UserId = 1
            };
            _projectServiceMock.Setup(service => service.GetProjectById(It.IsAny<int>()))
                .Returns(TestValuesProvider.GetProjects().FirstOrDefault());

            IActionResult result = this.ProjectsControllerInstance.UpdateProject(projectId, projectData);

            Assert.IsType<OkResult>(result);
        }
    }
}