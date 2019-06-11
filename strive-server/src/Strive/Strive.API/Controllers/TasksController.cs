using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Dtos.Tasks;
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
                List<TaskListItemDto> taskDtos = _mapper.Map<List<Task>, List<TaskListItemDto>>(taskEntities);
                return Ok(taskDtos);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Gets task info by specified parameters
        /// </summary>
        /// <param name="taskId">Target task id</param>
        [HttpGet("get-info")]
        public IActionResult GetTaskInfo(int taskId)
        {
            try
            {
                Task task = _taskService.GetTaskById(taskId);
                if (task == null)
                    return NotFound(taskId);
                return Ok(_mapper.Map<Task, TaskInfoDto>(task));
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
        public IActionResult CreateTask([FromBody] TaskCreateUpdateDto taskData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Task task = _mapper.Map<Task>(taskData);
                    _taskService.Create(task);
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
        /// Validates sent task data and updates a new task based on received data
        /// </summary>
        /// <param name="taskId">Existing task id</param>
        /// <param name="updatedTaskData">New task data</param>
        [HttpPut("update")]
        public IActionResult UpdateTask([FromBody] TaskCreateUpdateDto updatedTaskData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Task taskForUpdate = _taskService.GetTaskById(updatedTaskData.Id);
                    if (taskForUpdate != null)
                    {
                        taskForUpdate = _mapper.Map(updatedTaskData, taskForUpdate);
                        _taskService.Update(taskForUpdate);
                        return Ok();
                    }
                    return NotFound(updatedTaskData.Id);
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
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
                {
                    _taskService.Delete(taskForDelete);
                    return Ok();
                }
                return NotFound(taskId);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}