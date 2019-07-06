using System;
using System.Collections.Generic;
using System.Linq;
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

        private readonly ITaskStatusService _taskStatusService;

        private readonly IMapper _mapper;

        public TasksController(
            ITaskService taskService,
            ITaskStatusService taskStatusService,
            IMapper mapper)
        {
            _taskService = taskService;
            _taskStatusService = taskStatusService;
            _mapper = mapper;
        }

        /// <summary>
        /// Gets a list of tasks by specified parameters
        /// </summary>
        /// <param name="projectId">Project id</param>
        [HttpGet("get-list")]
        public IActionResult GetTaskList([FromQuery] TaskListRequestDto requestParams)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                List<Task> taskEntities = _taskService.GetTasks(requestParams);
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
        public IActionResult GetTaskInfo([FromQuery] TaskInfoRequestDto request)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                Task task = _taskService.GetTaskById(request.TaskId.Value);
                if (task == null)
                    return NotFound(request.TaskId.Value);
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
        public IActionResult CreateTask([FromBody] TaskCreateUpdateRequestDto taskData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Task task = _mapper.Map<Task>(taskData);

                    TaskStatus newTaskStatus = _taskStatusService.GetStatus(taskData.Status);
                    if (newTaskStatus == null)
                        return NotFound(taskData.Status);

                    task.Status = newTaskStatus;
                    _taskService.Create(task);
                    return Ok();
                }

                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Validates sent task data and updates a new task based on received data
        /// </summary>
        /// <param name="taskId">Existing task id</param>
        /// <param name="updatedTaskData">New task data</param>
        [HttpPut("update")]
        public IActionResult UpdateTask([FromBody] TaskCreateUpdateRequestDto updatedTaskData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Task taskForUpdate = _taskService.GetTaskById(updatedTaskData.Id.Value);
                    if (taskForUpdate != null)
                    {
                        taskForUpdate = _mapper.Map(updatedTaskData, taskForUpdate);

                        if (updatedTaskData.Status != taskForUpdate.Status.Label)
                        {
                            TaskStatus newTaskStatus = _taskStatusService.GetStatus(updatedTaskData.Status);
                            if (newTaskStatus == null)
                                return NotFound(updatedTaskData.Status);
                            taskForUpdate.Status = newTaskStatus;
                        }

                        _taskService.Update(taskForUpdate);
                        return Ok();
                    }
                    return NotFound(updatedTaskData.Id);
                }

                return BadRequest(ModelState);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Searches task by specified id. If task is found, deletes it
        /// </summary>
        /// <param name="taskId">Specified task id</param>
        [HttpDelete("delete/{request.TaskId}")]
        public IActionResult DeleteTask(TaskDeleteRequestDto request)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                Task taskForDelete = _taskService.GetTaskById(request.TaskId.Value);
                if (taskForDelete != null)
                {
                    _taskService.Delete(taskForDelete);
                    return Ok();
                }
                return NotFound(request.TaskId.Value);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Sets status for one or multiple tasks
        /// </summary>
        /// <param name="setStatusData">Data from request for setting status</param>
        [HttpPut("set-status")]
        public IActionResult SetStatus([FromBody] TaskSetStatusRequestDto setStatusData)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                IEnumerable<int> taskIdsForUpdate = setStatusData.Tasks
                    .Where(task => task.Checked == true)
                    .Select(task => task.Id);
                IEnumerable<Task> taskEntitiesForUpdate = _taskService.GetTasks(taskIdsForUpdate);

                TaskStatus status = _taskService.GetStatusByLabel(setStatusData.Status);

                if (status == null)
                    return NotFound(setStatusData.Status);
                return Ok(_taskService.ChangeStatus(taskEntitiesForUpdate, status));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}