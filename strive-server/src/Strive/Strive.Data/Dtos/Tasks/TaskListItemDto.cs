﻿namespace Strive.Data.Dtos.Tasks
{
    public class TaskListItemDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool Checked { get; set; } = false;

        public int ProjectId { get; set; }
    }
}