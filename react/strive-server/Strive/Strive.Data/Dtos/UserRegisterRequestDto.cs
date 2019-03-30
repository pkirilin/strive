namespace Strive.Data.Dtos
{
	/// <summary>
	/// Contains application user register request transfer data
	/// </summary>
	public class UserRegisterRequestDto
	{
		public string Email { get; set; }

		public string Username { get; set; }

		public string Password { get; set; }

		public string PasswordConfirm { get; set; }
	}
}
