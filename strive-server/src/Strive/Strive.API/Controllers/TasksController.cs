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
    /// Provides API methods for viewing and editing application tasks
    /// </summary>
    [Authorize]
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
            try
            {
                List<Task> taskEntities = _taskService.GetTasks(projectId);
                List<TaskDto> taskDtos = _mapper.Map<List<Task>, List<TaskDto>>(taskEntities);
                return Ok(taskDtos);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Validates sent task data and creates a new task based on received data
        /// </summary>
        /// <param name="taskData">Task data received from form</param>
        [HttpPost("create")]
        public IActionResult CreateTask([FromBody] TaskDto taskData)
        {
            if (ModelState.IsValid)
            {
                if (_taskService.IsTaskExists(taskData.Name, taskData.ProjectId))
                    ModelState.AddModelError("taskNameRemote",
                        "Task with specified name is already exists in specified project");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    Task task = _mapper.Map<Task>(taskData);
                    return Ok(_taskService.Create(task));
                }
                catch (Exception e)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
                }
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// Validates sent task data and updates a new task based on received data
        /// </summary>
        /// <param name="taskId">Existing task id</param>
        /// <param name="updatedTaskData">New task data</param>
        [HttpPut("update/{taskId}")]
        public IActionResult UpdateTask(int taskId, [FromBody] TaskDto updatedTaskData)
        {
            if (ModelState.IsValid)
            {
                if (_taskService.IsTaskExists(updatedTaskData.Name, updatedTaskData.ProjectId))
                    ModelState.AddModelError("taskNameRemote",
                        "Task with specified name is already exists in specified project");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    Task taskForUpdate = _taskService.GetTaskById(taskId);
                    if (taskForUpdate != null)
                    {
                        taskForUpdate = _mapper.Map(updatedTaskData, taskForUpdate);
                        return Ok(_taskService.Update(taskForUpdate));
                    }

                    return NotFound(taskId);
                }
                catch (Exception e)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
                }
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// Searches task by specified id. If task is found, deletes it
        /// </summary>
        /// <param name="taskId">Specified task id</param>
        [HttpDelete("delete/{taskId}")]
        public IActionResult DeleteTask(int taskId)
        {
            try
            {
                Task taskForDelete = _taskService.GetTaskById(taskId);

                if (taskForDelete != null)
                    return Ok(_taskService.Delete(taskForDelete));

                return NotFound(taskId);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}