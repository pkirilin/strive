﻿using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos
{
    public class TaskCreateUpdateDto
    {
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(255)]
        public string Name { get; set; }

        [MaxLength(511)]
        public string Description { get; set; }

        public int ProjectId { get; set; }
    }
}
