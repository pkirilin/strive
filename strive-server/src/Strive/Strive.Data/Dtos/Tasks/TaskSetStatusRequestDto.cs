using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos.Tasks
{
    public class TaskSetStatusRequestDto
    {
        [Required]
        public IEnumerable<TaskListItemDto> Tasks { get; set; }

        [Required]
        public string Status { get; set; }
    }
}
