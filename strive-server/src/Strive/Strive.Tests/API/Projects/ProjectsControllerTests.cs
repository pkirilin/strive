﻿using AutoMapper;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Services.Interfaces;

namespace Strive.Tests.API.Projects
{
    public class ProjectsControllerTests
    {
        protected readonly Mock<IMapper> _mapperMock;

        protected readonly Mock<IProjectService> _projectServiceMock;

        public ProjectsControllerTests()
        {
            var mapperConfig = new MapperConfiguration(cfg =>
            {
				cfg.AddProfiles("Strive.API");
			});

            _mapperMock = new Mock<IMapper>();

            _projectServiceMock = new Mock<IProjectService>();
        }

        public ProjectsController ProjectsControllerInstance
        {
            get { return new ProjectsController(_projectServiceMock.Object, _mapperMock.Object); }
        }
    }
}