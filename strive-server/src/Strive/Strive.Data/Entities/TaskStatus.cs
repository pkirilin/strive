using System.Collections.Generic;

namespace Strive.Data.Entities
{
    public class TaskStatus : StriveEntity
    {
        public string Label { get; set; }

        public List<Task> Tasks { get; set; }
    }
}
