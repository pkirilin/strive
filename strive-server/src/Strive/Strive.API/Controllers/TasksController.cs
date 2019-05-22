using System;
using Microsoft.AspNetCore.Mvc;

namespace Strive.API.Controllers
{
    [Route("tasks")]
    public class TasksController : Controller
    {
        [HttpGet("get-list")]
        public IActionResult GetTaskList(int projectId)
        {
            throw new NotImplementedException();
        }
    }
}