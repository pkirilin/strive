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
			CreateMap<RegisterRequestDto, User>()
				.ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.Email))
				.ForMember(dest => dest.Username, opts => opts.MapFrom(src => src.Username))
				.ForMember(dest => dest.PasswordHash, opts => opts.Ignore())
				.ForMember(dest => dest.PasswordSalt, opts => opts.Ignore())
				.ForMember(dest => dest.Projects, opts => opts.Ignore());
		}
	}
}
