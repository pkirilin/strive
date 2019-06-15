using System.Collections.Generic;

namespace Strive.Data.Dtos.Tasks
{
    public class SetTaskStatusDto
    {
        public IEnumerable<TaskListItemDto> Tasks { get; set; }

        public string Status { get; set; }
    }
}
