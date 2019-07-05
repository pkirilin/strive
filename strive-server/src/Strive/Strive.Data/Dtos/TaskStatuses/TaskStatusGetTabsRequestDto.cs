using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos.TaskStatuses
{
    public class TaskStatusGetTabsRequestDto
    {
        [Required]
        public int? ProjectId { get; set; }
    }
}
