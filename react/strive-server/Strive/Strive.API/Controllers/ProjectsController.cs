using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Dtos;
using Strive.Data.Entities;
using Strive.Data.Services;
using Strive.Exceptions;

namespace Strive.API.Controllers
{
	/// <summary>
	/// Provides API methods for viewing and editing application projects
	/// </summary>
	[Authorize]
	[Route("[controller]")]
	[ApiController]
	public class ProjectsController : ControllerBase
	{
		private readonly IProjectService _projectService;

	    private readonly IMapper _mapper;

		public ProjectsController(
		    IProjectService projectService, 
		    IMapper mapper)
		{
			_projectService = projectService;
		    _mapper = mapper;
		}

		/// <summary>
		/// Gets a list of projects by specified parameters
		/// </summary>
		/// <param name="userId">Projects owner id</param>
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

        /// <summary>
        /// Validates sent project data and creates a new project based on received data
        /// </summary>
        /// <param name="projectData">Project data received from form</param>
		[HttpPost("create")]
		public IActionResult CreateProject([FromBody]ProjectDto projectData)
		{
		    if (ModelState.IsValid)
		    {
		        if(_projectService.IsProjectExists(projectData.Name, projectData.UserId))
                    ModelState.AddModelError("projectNameRemote", "Project for target user with specified name is already exists");
		    }

		    if (ModelState.IsValid)
		    {
		        Project project = _mapper.Map<Project>(projectData);

		        try
		        {
		            _projectService.Create(project);
		            return Ok();
		        }
		        catch (Exception e)
		        {
		            return BadRequest(e.Message);
		        }
            }

		    return BadRequest(ModelState);
		}

		[HttpPost("update")]
		public IActionResult UpdateProject()
		{
			throw new NotImplementedException();
		}

		[HttpDelete("delete")]
		public IActionResult DeleteProject([FromBody]int projectId)
		{
		    if (_projectService.IsProjectExists(projectId))
		    {
		    }

		    throw new NotImplementedException();
		}
	}
}
