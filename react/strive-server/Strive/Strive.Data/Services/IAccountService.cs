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
	}
}
