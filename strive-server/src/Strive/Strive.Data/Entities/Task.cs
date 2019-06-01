namespace Strive.Data.Entities
{
    public class Task : StriveEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int ProjectId { get; set; }

        public Project Project { get; set; }
    }
}