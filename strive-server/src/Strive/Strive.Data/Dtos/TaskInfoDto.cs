namespace Strive.Data.Dtos
{
    public class TaskInfoDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public ProjectInfoDto Project { get; set; }
    }
}
