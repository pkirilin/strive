namespace Strive.Data.Dtos.Tasks
{
    public class GetTaskListRequestDto
    {
        public int? ProjectId { get; set; }

        public string Status { get; set; }
    }
}
