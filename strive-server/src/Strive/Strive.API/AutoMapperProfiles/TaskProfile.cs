using AutoMapper;
using Strive.Data.Dtos.Tasks;
using Strive.Data.Dtos.TaskStatuses;
using Strive.Data.Entities;

namespace Strive.API.AutoMapperProfiles
{
	public class TaskProfile : Profile
	{
		public TaskProfile()
		{
			MapTaskToTaskListItemDto();
			MapTaskToTaskInfoDto();
			MapTaskToTaskStatusSelectItemDto();
			MapTaskCreateUpdateDtoToTask();
		}

		private void MapTaskToTaskListItemDto()
		{
			CreateMap<Task, TaskListItemDto>()
				.ForMember(dto => dto.Status, opts => opts.MapFrom(entity => entity.Status.Label));
		}

		private void MapTaskToTaskInfoDto()
		{
			CreateMap<Task, TaskInfoDto>();
		}

		private void MapTaskToTaskStatusSelectItemDto()
		{
			CreateMap<Task, TaskStatusSelectItemDto>();
		}

		private void MapTaskCreateUpdateDtoToTask()
		{
			CreateMap<TaskCreateUpdateDto, Task>()
				.ForMember(entity => entity.Status, opts => opts.Ignore());
		}
	}
}
