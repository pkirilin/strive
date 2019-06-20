using AutoMapper;
using Strive.Data.Dtos.Account;
using Strive.Data.Dtos.Projects;
using Strive.Data.Dtos.Tasks;
using Strive.Data.Dtos.TaskStatuses;
using Strive.Data.Entities;

namespace Strive.API
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<RegisterRequestDto, User>();

            CreateMap<Project, ProjectListItemDto>();
            CreateMap<Project, ProjectInfoDto>();
            CreateMap<ProjectCreateUpdateDto, Project>();

            CreateMap<Task, TaskListItemDto>()
                .ForMember(dto => dto.Status, opts => opts.MapFrom(entity => entity.Status.Label));
            CreateMap<Task, TaskInfoDto>();
            CreateMap<TaskCreateUpdateDto, Task>();

            CreateMap<Task, TaskStatusSelectItemDto>();
        }
    }
}