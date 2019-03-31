using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos
{
	/// <summary>
	/// Contains application user login request transfer data
	/// </summary>
	public class UserLoginRequestDto
	{
		[Required]
		public string Username { get; set; }

		[Required]
		public string Password { get; set; }

		public bool RememberMe { get; set; } = false;
	}
}
