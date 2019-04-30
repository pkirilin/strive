using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Services;

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
			throw new NotImplementedException();
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
