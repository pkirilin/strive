using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Services.Interfaces;

namespace Strive.API.Controllers
{
    [Authorize]
    [Route("task-statuses")]
    public class TaskStatusesController : Controller
    {
        private readonly ITaskStatusService _taskStatusService;

        public TaskStatusesController(ITaskStatusService taskStatusService)
        {
            _taskStatusService = taskStatusService;
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