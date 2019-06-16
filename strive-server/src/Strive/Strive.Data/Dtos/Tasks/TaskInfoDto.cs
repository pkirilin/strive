using Strive.Data.Dtos.Projects;
using Strive.Data.Entities;

namespace Strive.Data.Dtos.Tasks
{
    public class TaskInfoDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public ProjectInfoDto Project { get; set; }

        public TaskStatus Status { get; set; }
    }
}
