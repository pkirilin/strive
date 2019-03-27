using AutoMapper;
using Strive.Data.Dtos;
using Strive.Data.Entities;

namespace Strive.Helpers.Settings
{
	public class AutoMapperProfile : Profile
	{
		public AutoMapperProfile()
		{
			CreateMap<UserLoginRequestDto, User>();
		}
	}
}
