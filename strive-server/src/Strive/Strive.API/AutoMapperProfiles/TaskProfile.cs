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
				.ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id))
				.ForMember(dest => dest.Title, opts => opts.MapFrom(src => src.Title))
				.ForMember(dest => dest.Description, opts => opts.MapFrom(src => src.Description))
				.ForMember(dest => dest.Checked, opts => opts.Ignore())
				.ForMember(dest => dest.Status, opts => opts.MapFrom(src => src.Status.Label))
				.ForMember(dest => dest.ProjectId, opts => opts.MapFrom(src => src.ProjectId));
		}

		private void MapTaskToTaskInfoDto()
		{
			CreateMap<Task, TaskInfoDto>()
				.ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id))
				.ForMember(dest => dest.Title, opts => opts.MapFrom(src => src.Title))
				.ForMember(dest => dest.Description, opts => opts.MapFrom(src => src.Description))
				.ForMember(dest => dest.Project, opts => opts.MapFrom(src => src.Project))
				.ForMember(dest => dest.Status, opts => opts.MapFrom(src => src.Status));
		}

		private void MapTaskToTaskStatusSelectItemDto()
		{
			CreateMap<Task, TaskStatusSelectItemDto>()
				.ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id))
				.ForMember(dest => dest.Label, opts => opts.MapFrom(src => src.Status.Label));
		}

		private void MapTaskCreateUpdateDtoToTask()
		{
			CreateMap<TaskCreateUpdateDto, Task>()
				.ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id))
				.ForMember(dest => dest.Title, opts => opts.MapFrom(src => src.Title))
				.ForMember(dest => dest.Description, opts => opts.MapFrom(src => src.Description))
				.ForMember(dest => dest.Status, opts => opts.Ignore())
				.ForMember(dest => dest.ProjectId, opts => opts.MapFrom(src => src.ProjectId));
		}
	}
}
