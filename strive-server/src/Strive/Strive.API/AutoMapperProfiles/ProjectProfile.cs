using AutoMapper;
using Strive.Data.Dtos.Projects;
using Strive.Data.Entities;

namespace Strive.API.AutoMapperProfiles
{
	public class ProjectProfile : Profile
	{
		public ProjectProfile()
		{
			MapFromProjectToProjectListItemDto();
			MapFromProjectToProjectInfoDto();
			MapFromProjectCreateUpdateDtoToProject();
		}

		private void MapFromProjectToProjectListItemDto()
		{
			CreateMap<Project, ProjectListItemDto>()
				.ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id))
				.ForMember(dest => dest.Name, opts => opts.MapFrom(src => src.Name))
				.ForMember(dest => dest.Description, opts => opts.MapFrom(src => src.Description))
				.ForMember(dest => dest.UserId, opts => opts.MapFrom(src => src.UserId));
		}

		private void MapFromProjectToProjectInfoDto()
		{
			CreateMap<Project, ProjectInfoDto>()
				.ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id))
				.ForMember(dest => dest.Name, opts => opts.MapFrom(src => src.Name))
				.ForMember(dest => dest.Description, opts => opts.MapFrom(src => src.Description))
				.ForMember(dest => dest.UserId, opts => opts.MapFrom(src => src.UserId));
		}

		private void MapFromProjectCreateUpdateDtoToProject()
		{
			CreateMap<ProjectCreateUpdateRequestDto, Project>()
				.ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id))
				.ForMember(dest => dest.Name, opts => opts.MapFrom(src => src.Name))
				.ForMember(dest => dest.Description, opts => opts.MapFrom(src => src.Description))
				.ForMember(dest => dest.UserId, opts => opts.MapFrom(src => src.UserId))
				.ForMember(dest => dest.User, opts => opts.Ignore())
				.ForMember(dest => dest.Tasks, opts => opts.Ignore());
		}
	}
}
