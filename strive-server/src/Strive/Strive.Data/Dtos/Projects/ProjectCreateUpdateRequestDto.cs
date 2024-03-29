﻿using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos.Projects
{
    public class ProjectCreateUpdateRequestDto
    {
        public int? Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(255)]
        public string Name { get; set; }

        [MaxLength(511)]
        public string Description { get; set; }

        [Required]
        public int? UserId { get; set; }
    }
}
