using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Dtos;
using Strive.Data.Entities;
using Strive.Data.Services.Interfaces;

namespace Strive.API.Controllers
{
    /// <summary>
    /// Provides API methods for viewing and editing application projects
    /// </summary>
    [Authorize]
    [Route("projects")]
    public class ProjectsController : Controller
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
            try
            {
                List<Project> projectEntities = _projectService.GetProjects(userId);
                List<ProjectDto> projectDtos = _mapper.Map<List<Project>, List<ProjectDto>>(projectEntities);
                return Ok(projectDtos);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Gets project info by specified parameters
        /// </summary>
        /// <param name="projectId">Target project id</param>
        [HttpGet("get-info")]
        public IActionResult GetProjectInfo(int projectId, int userId)
        {
            try
            {
                Project project = _projectService.GetProjectById(projectId);
                if (project == null)
                    return NotFound(projectId);
                if (project.UserId != userId)
                    return Unauthorized();
                return Ok(_mapper.Map<Project, ProjectDto>(project));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Validates sent project data and creates a new project based on received data
        /// </summary>
        /// <param name="projectData">Project data received from form</param>
        [HttpPost("create")]
        public IActionResult CreateProject([FromBody] ProjectDto projectData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (_projectService.IsProjectExists(projectData.Name, projectData.UserId))
                        ModelState.AddModelError("projectNameRemote", "Project for target user with specified name is already exists");
                }

                if (ModelState.IsValid)
                {
                    Project project = _mapper.Map<Project>(projectData);
                    _projectService.Create(project);
                    return Ok();
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// Validates sent project data and updates an existing project
        /// </summary>
        /// <param name="projectId">Existing project id</param>
        /// <param name="updatedProjectData">New project data</param>
        [HttpPut("update/{projectId}")]
        public IActionResult UpdateProject(int projectId, [FromBody] ProjectDto updatedProjectData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (_projectService.IsProjectExists(updatedProjectData.Name, updatedProjectData.UserId))
                        ModelState.AddModelError("projectNameRemote",
                            "Project for target user with specified name is already exists");
                }

                if (ModelState.IsValid)
                {
                    Project projectForUpdate = _projectService.GetProjectById(projectId);
                    if (projectForUpdate != null)
                    {
                        // Returns projectForUpdate object with fields rewritten according to DTO object
                        projectForUpdate = _mapper.Map(updatedProjectData, projectForUpdate);
                        _projectService.Update(projectForUpdate);
                        return Ok();
                    }
                    return NotFound(projectId);
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// Searches project by specified id. If project is found, deletes it
        /// </summary>
        /// <param name="projectId">Specified project id</param>
        [HttpDelete("delete/{projectId}")]
        public IActionResult DeleteProject(int projectId)
        {
            try
            {
                Project projectForDelete = _projectService.GetProjectById(projectId);
                if (projectForDelete != null)
                {
                    _projectService.Delete(projectForDelete);
                    return Ok();
                }
                return NotFound(projectId);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}