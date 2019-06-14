namespace Strive.Data.Entities
{
    public class Task : StriveEntity
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public int? ProjectId { get; set; }

        public int? StatusId { get; set; }

        public Project Project { get; set; }

        public TaskStatus Status { get; set; }
    }
}