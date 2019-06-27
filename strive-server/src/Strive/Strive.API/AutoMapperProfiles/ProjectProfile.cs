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
			CreateMap<Project, ProjectListItemDto>();
		}

		private void MapFromProjectToProjectInfoDto()
		{
			CreateMap<Project, ProjectInfoDto>();
		}

		private void MapFromProjectCreateUpdateDtoToProject()
		{
			CreateMap<ProjectCreateUpdateDto, Project>();
		}
	}
}
