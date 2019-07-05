using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos.Projects
{
    public class ProjectListRequestDto
    {
        [Required]
        public int? UserId { get; set; }
    }
}
