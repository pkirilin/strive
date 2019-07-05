using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos.Tasks
{
    public class TaskDeleteRequestDto
    {
        [Required]
        public int? TaskId { get; set; }
    }
}
