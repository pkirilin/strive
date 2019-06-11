using AutoMapper;
using Strive.Data.Dtos.Account;
using Strive.Data.Dtos.Projects;
using Strive.Data.Dtos.Tasks;
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

            CreateMap<ProjectListItemDto, Project>();

            CreateMap<Task, TaskInfoDto>();
            CreateMap<Task, TaskListItemDto>();

            CreateMap<TaskCreateUpdateDto, Task>();
        }
    }
}