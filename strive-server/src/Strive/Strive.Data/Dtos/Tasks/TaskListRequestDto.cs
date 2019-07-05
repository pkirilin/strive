using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos.Tasks
{
    public class TaskListRequestDto
    {
        [Required]
        public int? ProjectId { get; set; }

        public string Status { get; set; }
    }
}
