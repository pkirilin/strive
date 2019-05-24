using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Dtos;
using Strive.Data.Services.Interfaces;

namespace Strive.API.Controllers
{
    /// <summary>
    /// Provides API methods for viewing and editing application tasks
    /// </summary>
    [Route("tasks")]
    public class TasksController : Controller
    {
        private readonly ITaskService _taskService;

        private readonly IMapper _mapper;

        public TasksController(
            ITaskService taskService, 
            IMapper mapper)
        {
            _taskService = taskService;
            _mapper = mapper;
        }

        /// <summary>
        /// Gets a list of tasks by specified parameters
        /// </summary>
        /// <param name="projectId">Project id</param>
        [HttpGet("get-list")]
        public IActionResult GetTaskList(int projectId)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Validates sent task data and creates a new task based on received data
        /// </summary>
        /// <param name="taskData">Task data received from form</param>
        [HttpPost("create")]
        public IActionResult CreateTask([FromBody]TaskDto taskData)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Validates sent task data and updates a new task based on received data
        /// </summary>
        /// <param name="taskId">Existing task id</param>
        /// <param name="updatedTaskData">New task data</param>
        [HttpPut("update/{taskId}")]
        public IActionResult UpdateTask(int taskId, [FromBody]TaskDto updatedTaskData)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Searches task by specified id. If task is found, deletes it
        /// </summary>
        /// <param name="taskId">Specified task id</param>
        [HttpDelete("delete/{taskId}")]
        public IActionResult DeleteTask(int taskId)
        {
            throw new NotImplementedException();
        }
    }
}