using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Dtos;
using Strive.Data.Entities;
using System.Text;
using Microsoft.Extensions.Options;
using Strive.Helpers.Settings;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Strive.Data.Services.Interfaces;

namespace Strive.API.Controllers
{
    [Authorize]
	[Route("account")]
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
		/// Authenticates user, if authentication successful generates JWT-token
		/// </summary>
		/// <param name="userLoginRequestData">Data received from login form</param>
		[AllowAnonymous]
		[HttpPost("authenticate")]
		public IActionResult Authenticate([FromBody]UserLoginRequestDto userLoginRequestData)
		{
			User user;

			try
			{
				user = _accountService.Authenticate(userLoginRequestData.Email, userLoginRequestData.Password);
			}
			catch (Exception)
			{
				return Unauthorized();
			}

		    string tokenString;

		    try
		    {
		        var tokenHandler = new JwtSecurityTokenHandler();
		        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

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
		        tokenString = tokenHandler.WriteToken(token);
		    }
		    catch (Exception e)
		    {
		        return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
		    }

			// Returning basic user info (without password) and token to store client side
			return Ok(new
			{
				Id = user.Id,
				Username = user.Username,
				Token = tokenString
			});
		}

		/// <summary>
		/// Validates data received from register form, if validation successful creates new user
		/// </summary>
		/// <param name="userRegisterRequestData">Data received from register form</param>
		[AllowAnonymous]
		[HttpPost("register")]
		public IActionResult Register([FromBody]UserRegisterRequestDto userRegisterRequestData)
		{
			// Validates data from form
			if (ModelState.IsValid)
			{
				if (_accountService.IsEmailExists(userRegisterRequestData.Email))
					ModelState.AddModelError("emailRemote", "Such email is already exists");

				if (_accountService.IsUsernameExists(userRegisterRequestData.Username))
					ModelState.AddModelError("usernameRemote", "Such username is already in use");
			}

			// Validates all data including business logic
			if (ModelState.IsValid)
			{
                try
				{
				    User user = _mapper.Map<User>(userRegisterRequestData);
                    _accountService.Create(user, userRegisterRequestData.Password);
					return Ok();
				}
				catch (Exception e)
				{
					return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
				}
			}

			return BadRequest(ModelState);
		}
	}
}
