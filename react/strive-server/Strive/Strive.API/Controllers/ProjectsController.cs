using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Strive.API.Controllers
{
	[Authorize]
	[Route("[controller]")]
	[ApiController]
	public class ProjectsController : ControllerBase
	{
		public ProjectsController()
		{
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
