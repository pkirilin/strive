using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Strive.Data.Entities;
using System.Text;
using Microsoft.Extensions.Options;
using Strive.Helpers.Settings;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using AutoMapper;
using Strive.Data.Dtos.Account;
using Strive.Data.Services.Interfaces;

namespace Strive.API.Controllers
{
    /// <summary>
    /// Provides API methods related to user account
    /// </summary>
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
        /// Authorizes user, if authentication successful generates JWT-token
        /// </summary>
        /// <param name="userLoginRequestData">Data received from login form</param>
        [AllowAnonymous]
        [HttpPost("authorize")]
        public IActionResult Authorize([FromBody] AuthorizationRequestDto userLoginRequestData)
        {
            User user = _accountService.Authorize(userLoginRequestData.Email, userLoginRequestData.Password);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            string tokenString = tokenHandler.WriteToken(token);

            // Returning basic user info (without password) and token to store client side
            var response = new AuthorizationResponseDto()
            {
                Id = user.Id,
                Username = user.Username,
                Token = tokenString
            };

            return Ok(response);
        }

        /// <summary>
        /// Validates data received from register form, if validation successful creates new user
        /// </summary>
        /// <param name="userRegisterRequestData">Data received from register form</param>
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequestDto userRegisterRequestData)
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
                User user = _mapper.Map<User>(userRegisterRequestData);
                _accountService.Create(user, userRegisterRequestData.Password);
                return Ok();
            }

            return BadRequest(ModelState);
        }
    }
}