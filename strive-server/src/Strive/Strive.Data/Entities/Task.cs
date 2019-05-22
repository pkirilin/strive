namespace Strive.Data.Entities
{
    public class Task
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int ProjectId { get; set; }

        public Project Project { get; set; }
    }
}
