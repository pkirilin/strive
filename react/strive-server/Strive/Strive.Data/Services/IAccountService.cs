using Strive.Data.Entities;

namespace Strive.Data.Services
{
	public interface IAccountService
	{
		/// <summary>
		/// Authenticates user by username and password
		/// </summary>
		/// <returns>Authenticated user if authentication successful, if not returns null</returns>
		User Authenticate(string username, string password);

		/// <summary>
		/// Creates new user
		/// </summary>
		/// <param name="user">User object converted from request data</param>
		User Create(User user, string password);

		/// <summary>
		/// Checks if user with specified email already exists
		/// </summary>
		/// <param name="email">Email from request</param>
		bool IsEmailExists(string email);

		/// <summary>
		/// Checks if user with specified username already exists
		/// </summary>
		/// <param name="username">Username from request</param>
		bool IsUsernameExists(string username);
	}
}
