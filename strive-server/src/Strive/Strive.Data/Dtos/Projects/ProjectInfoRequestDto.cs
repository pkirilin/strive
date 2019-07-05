using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos.Projects
{
    public class ProjectInfoRequestDto
    {
        [Required]
        public int? ProjectId { get; set; }

        [Required]
        public int? UserId { get; set; }
    }
}
