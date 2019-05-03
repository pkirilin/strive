﻿using AutoMapper;
using Moq;
using Strive.API;
using Strive.API.Controllers;
using Strive.Data.Services;

namespace Strive.Tests.API.Projects
{
	public class ProjectControllerTests
	{
	    protected readonly Mock<IMapper> _mapperMock;

        protected readonly Mock<IProjectService> _projectServiceMock;

		public ProjectControllerTests()
		{
		    var mapperConfig = new MapperConfiguration(cfg =>
		    {
		        cfg.AddProfile(new AutoMapperProfile());
		    });

		    _mapperMock = new Mock<IMapper>();

            _projectServiceMock = new Mock<IProjectService>();
		}

		public ProjectsController ProjectsControllerInstance
		{
			get
			{
				return new ProjectsController(_projectServiceMock.Object, _mapperMock.Object);
			}
		}
	}
}