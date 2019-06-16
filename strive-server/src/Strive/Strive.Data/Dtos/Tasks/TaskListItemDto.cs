namespace Strive.Data.Dtos.Tasks
{
    public class TaskListItemDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool Checked { get; set; } = false;

        public string Status { get; set; }

        public int ProjectId { get; set; }
    }
}