using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos.Tasks
{
    public class TaskInfoRequestDto
    {
        [Required]
        public int? TaskId { get; set; }
    }
}
