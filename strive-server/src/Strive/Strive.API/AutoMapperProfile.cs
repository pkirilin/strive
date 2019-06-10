using AutoMapper;
using Strive.Data.Dtos;
using Strive.Data.Entities;

namespace Strive.API
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserRegisterRequestDto, User>();

            CreateMap<Project, ProjectListItemDto>();
            CreateMap<Project, ProjectInfoDto>();

            CreateMap<ProjectListItemDto, Project>();

            CreateMap<Task, TaskInfoDto>();
            CreateMap<Task, TaskListItemDto>();

            CreateMap<TaskCreateUpdateDto, Task>();
        }
    }
}