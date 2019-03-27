namespace Strive.Data.Dtos
{
	/// <summary>
	/// Contains application user login request transfer data
	/// </summary>
	public class UserLoginRequestDto
	{
		public string Email { get; set; }

		public string Password { get; set; }

		public bool RememberMe { get; set; }
	}
}
