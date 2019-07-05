using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos.Tasks
{
    public class TaskCreateUpdateRequestDto
    {
        public int? Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(255)]
        public string Title { get; set; }

        [MaxLength(511)]
        public string Description { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public int? ProjectId { get; set; }
    }
}
