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
		    CreateMap<ProjectDto, Project>();
		}
	}
}
