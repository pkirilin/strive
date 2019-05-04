using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Dtos;
using Strive.Data.Entities;
using Strive.Data.Services;

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
			catch (Exception e)
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
		            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
                }
            }

		    return BadRequest(ModelState);
		}

		[HttpPost("update")]
		public IActionResult UpdateProject()
		{
			throw new NotImplementedException();
		}

        /// <summary>
        /// Searches project by specified id. If project is found, deletes it
        /// </summary>
        /// <param name="projectId">Specified project id</param>
		[HttpDelete("delete")]
		public IActionResult DeleteProject([FromBody]int projectId)
		{
		    Project projectForDelete;
            
		    try
		    {
		        projectForDelete = _projectService.GetProjectById(projectId);

                if (projectForDelete != null)
		        {
		            // Project was found and can be deleted
		            _projectService.Delete(projectForDelete);
		            return Ok();
		        }
            }
		    catch (Exception e)
		    {
		        return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
		    }

		    return BadRequest($"Failed to delete project. Couldn't find project with specified id");
        }
	}
}
