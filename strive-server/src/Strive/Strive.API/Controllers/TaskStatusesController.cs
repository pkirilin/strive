using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Dtos.TaskStatuses;
using Strive.Data.Services.Interfaces;

namespace Strive.API.Controllers
{
    [Authorize]
    [Route("task-statuses")]
    public class TaskStatusesController : Controller
    {
        private readonly ITaskStatusService _taskStatusService;

        private readonly IMapper _mapper;

        public TaskStatusesController(ITaskStatusService taskStatusService, IMapper mapper)
        {
            _taskStatusService = taskStatusService;
            _mapper = mapper;
        }

        /// <summary>
        /// Gets all task statuses
        /// </summary>
        [HttpGet("get-statuses")]
        public IActionResult GetStatuses()
        {
            try
            {
                var statusEntities = _taskStatusService.GetStatuses();
                var statusDtos = _mapper.Map<IEnumerable<TaskStatusSelectItemDto>>(statusEntities);
                return Ok(statusDtos);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Gets status label and tasks count for each status of specified project
        /// </summary>
        /// <param name="projectId">Specified project id</param>
        [HttpGet("get-status-tabs")]
        public IActionResult GetStatusTabs(int projectId)
        {
            try
            {
                return Ok(_taskStatusService.GetStatusTabs(projectId));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}