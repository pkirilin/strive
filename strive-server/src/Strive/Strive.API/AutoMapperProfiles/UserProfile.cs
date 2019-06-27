using AutoMapper;
using Strive.Data.Dtos.Account;
using Strive.Data.Entities;

namespace Strive.API.AutoMapperProfiles
{
	public class UserProfile : Profile
	{
		public UserProfile()
		{
			MapRegisterRequestDtoToUser();
		}

		private void MapRegisterRequestDtoToUser()
		{
			CreateMap<RegisterRequestDto, User>();
		}
	}
}
