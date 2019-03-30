using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Dtos;
using Strive.Data.Entities;
using Strive.Data.Services;
using System.Text;
using Microsoft.Extensions.Options;
using Strive.Helpers.Settings;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using AutoMapper;

namespace Strive.API.Controllers
{
	[Authorize]
	[Route("[controller]")]
	public class AccountController : Controller
	{
		private readonly IAccountService _accountService;

		private readonly IMapper _mapper;

		private readonly AppSettings _appSettings;

		public AccountController(
			IAccountService accountService, 
			IMapper mapper,
			IOptions<AppSettings> appSettings)
		{
			_accountService = accountService;
			_mapper = mapper;
			_appSettings = appSettings.Value;
		}

		/// <summary>
		/// User authentication action method
		/// </summary>
		/// <param name="userLoginRequestData">Data received from login form</param>
		[AllowAnonymous]
		[HttpPost("authenticate")]
		public IActionResult Authenticate([FromBody]UserLoginRequestDto userLoginRequestData)
		{
			User user = _accountService.Authenticate(
				userLoginRequestData.Username, userLoginRequestData.Password);

			if (user == null)
				return Unauthorized();

			var tokenHandler = new JwtSecurityTokenHandler();
			byte[] key = Encoding.ASCII.GetBytes(_appSettings.Secret);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
				{
					new Claim(ClaimTypes.Name, user.Id.ToString())
				}),
				Expires = DateTime.UtcNow.AddDays(7),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			var tokenString = tokenHandler.WriteToken(token);

			// Returning basic user info (without password) and token to store client side
			return Ok(new
			{
				Id = user.Id,
				Username = user.Username,
				Token = tokenString
			});
		}

		[AllowAnonymous]
		[HttpPost("register")]
		public IActionResult Register([FromBody]UserRegisterRequestDto userRegisterRequestData)
		{
			// Converting DTO to entity
			User user = _mapper.Map<User>(userRegisterRequestData);

			try
			{
				
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}

			return Ok();
		}
	}
}
