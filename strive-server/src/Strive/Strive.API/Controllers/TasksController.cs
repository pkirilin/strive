using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var taskEntities = _taskService.GetTasks(requestParams);
            var taskDtos = _mapper.Map<List<Task>, List<TaskListItemDto>>(taskEntities);
            return Ok(taskDtos);
        }

        /// <summary>
        /// Gets task info by specified parameters
        /// </summary>
        /// <param name="taskId">Target task id</param>
        [HttpGet("get-info")]
        public IActionResult GetTaskInfo([FromQuery] TaskInfoRequestDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var task = _taskService.GetTaskById(request.TaskId.Value);

            if (task == null)
                return NotFound($"Failed to get task: task with id = {request.TaskId.Value} was not found");

            var taskInfo = _mapper.Map<Task, TaskInfoDto>(task);

            return Ok(taskInfo);
        }

        /// <summary>
        /// Validates sent task data and creates a new task based on received data
        /// </summary>
        /// <param name="taskData">Task data received from form</param>
        [HttpPost("create")]
        public IActionResult CreateTask([FromBody] TaskCreateUpdateRequestDto taskData)
        {
            if (ModelState.IsValid)
            {
                var task = _mapper.Map<Task>(taskData);

                var newTaskStatus = _taskStatusService.GetStatus(taskData.Status);
                if (newTaskStatus == null)
                    return NotFound($"Failed to create task: status \"{taskData.Status}\" doesn't exist");

                task.Status = newTaskStatus;
                _taskService.Create(task);
                return Ok();
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// Validates sent task data and updates a new task based on received data
        /// </summary>
        /// <param name="taskId">Existing task id</param>
        /// <param name="updatedTaskData">New task data</param>
        [HttpPut("update")]
        public IActionResult UpdateTask([FromBody] TaskCreateUpdateRequestDto updatedTaskData)
        {
            if (ModelState.IsValid)
            {
                var taskForUpdate = _taskService.GetTaskById(updatedTaskData.Id.Value);

                if (taskForUpdate != null)
                {
                    taskForUpdate = _mapper.Map(updatedTaskData, taskForUpdate);

                    if (updatedTaskData.Status != taskForUpdate.Status.Label)
                    {
                        var newTaskStatus = _taskStatusService.GetStatus(updatedTaskData.Status);
                        if (newTaskStatus == null)
                            return NotFound($"Failed to update task: status \"{updatedTaskData.Status}\" doesn't exist");
                        taskForUpdate.Status = newTaskStatus;
                    }

                    _taskService.Update(taskForUpdate);
                    return Ok();
                }
                return NotFound($"Server couldn't find a task with id = {updatedTaskData.Id}");
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// Searches task by specified id. If task is found, deletes it
        /// </summary>
        /// <param name="taskId">Specified task id</param>
        [HttpDelete("delete/{request.TaskId}")]
        public IActionResult DeleteTask(TaskDeleteRequestDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var taskForDelete = _taskService.GetTaskById(request.TaskId.Value);

            if (taskForDelete == null)
                return NotFound($"Failed to delete task with id = {request.TaskId.Value}: task was not found");

            _taskService.Delete(taskForDelete);
            return Ok();
        }

        /// <summary>
        /// Sets status for one or multiple tasks
        /// </summary>
        /// <param name="setStatusData">Data from request for setting status</param>
        [HttpPut("set-status")]
        public IActionResult SetStatus([FromBody] TaskSetStatusRequestDto setStatusData)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var taskIdsForUpdate = setStatusData.Tasks
                .Where(task => task.Checked == true)
                .Select(task => task.Id);
            var taskEntitiesForUpdate = _taskService.GetTasks(taskIdsForUpdate);
            var status = _taskService.GetStatusByLabel(setStatusData.Status);

            if (status == null)
                return NotFound($"Failed to set status: server couldn't find a status named \"{setStatusData.Status}\"");

            return Ok(_taskService.ChangeStatus(taskEntitiesForUpdate, status));
        }
    }
}