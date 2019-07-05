using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos.Projects
{
    public class ProjectDeleteRequestDto
    {
        [Required]
        public int? ProjectId { get; set; }
    }
}
