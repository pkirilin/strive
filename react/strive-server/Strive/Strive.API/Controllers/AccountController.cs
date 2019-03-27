using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Strive.API.Controllers
{
	[Authorize]
	[Route("[controller]")]
	public class AccountController : Controller
	{
		public AccountController()
		{
		}


		[AllowAnonymous]
		[HttpPost("authenticate")]
		public IActionResult Authenticate()
		{
			//var user = _userService.Authenticate(userDto.Username, userDto.Password);

			//if (user == null)
			//	return Unauthorized();

			//var tokenHandler = new JwtSecurityTokenHandler();
			//var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
			//var tokenDescriptor = new SecurityTokenDescriptor
			//{
			//	Subject = new ClaimsIdentity(new Claim[]
			//	{
			//		new Claim(ClaimTypes.Name, user.Id.ToString())
			//	}),
			//	Expires = DateTime.UtcNow.AddDays(7),
			//	SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			//};
			//var token = tokenHandler.CreateToken(tokenDescriptor);
			//var tokenString = tokenHandler.WriteToken(token);

			// return basic user info (without password) and token to store client side
			//return Ok(new
			//{
			//	Id = user.Id,
			//	Username = user.Username,
			//	FirstName = user.FirstName,
			//	LastName = user.LastName,
			//	Token = tokenString
			//});

			return Ok();
		}
	}
}
