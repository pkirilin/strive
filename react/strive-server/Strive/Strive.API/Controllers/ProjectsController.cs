using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Entities;
using Strive.Data.Services;
using Strive.Exceptions;

namespace Strive.API.Controllers
{
	[Authorize]
	[Route("[controller]")]
	[ApiController]
	public class ProjectsController : ControllerBase
	{
		private readonly IProjectService _projectService;

		public ProjectsController(IProjectService projectService)
		{
			_projectService = projectService;
		}

		[HttpGet("get-list")]
		public IActionResult GetProjectList(int userId)
		{
			List<Project> projects;

			try
			{
				projects = _projectService.GetProjects(userId);
			}
			catch (StriveDatabaseException e)
			{
				return BadRequest(e.Message);
			}

			return Ok(projects);
		}

		[HttpPost("create")]
		public IActionResult CreateProject()
		{
			throw new NotImplementedException();
		}

		[HttpPost("update")]
		public IActionResult UpdateProject()
		{
			throw new NotImplementedException();
		}

		[HttpDelete("delete")]
		public IActionResult DeleteProject()
		{
			throw new NotImplementedException();
		}
	}
}
