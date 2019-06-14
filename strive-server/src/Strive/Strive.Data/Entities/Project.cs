using System.Collections.Generic;

namespace Strive.Data.Entities
{
    /// <summary>
    /// Contains info about project
    /// </summary>
    public class Project : StriveEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int? UserId { get; set; }

        public User User { get; set; }

        public List<Task> Tasks { get; set; }
    }
}