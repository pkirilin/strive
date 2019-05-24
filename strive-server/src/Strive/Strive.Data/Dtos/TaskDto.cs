using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos
{
    public class TaskDto
    {
        [Required]
        [MinLength(3)]
        [MaxLength(255)]
        public string Name { get; set; }

        [MaxLength(511)]
        public string Description { get; set; }

        public bool Checked { get; set; } = false;
    }
}
