using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Helpers;

namespace Strive.Data.Services
{
	public class AccountService : IAccountService
	{
		private readonly IUserRepository _userRepo;

		public AccountService(IUserRepository userRepo)
		{
			_userRepo = userRepo;
		}

		/// <summary>
		/// Authenticates user by username and password
		/// </summary>
		/// <returns>Authenticated user if authentication successful, if not returns null</returns>
		public User Authenticate(string username, string password)
		{
			// Checking if username or password is filled
			if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
				return null;

			User user = _userRepo.GetByUsername(username);

			// Checking if user exists in db
			if (user == null)
				return null;

			// Checking if password is correct
			if (!SecurityHelpers.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
				return null;

			// Authentication successful
			return user;
		}

		/// <summary>
		/// Creates new user
		/// </summary>
		/// <param name="user">User object converted from request data</param>
		public User Create(User user, string password)
		{
			byte[] passwordHash;
			byte[] passwordSalt;

			SecurityHelpers.CreatePasswordHash(password, out passwordHash, out passwordSalt);

			user.PasswordSalt = passwordSalt;
			user.PasswordHash = passwordHash;

			_userRepo.Add(user);

			return user;
		}

		public bool IsEmailExists(string email)
		{
			if (_userRepo.GetByEmail(email) == null)
				return false;
			return true;
		}

		public bool IsUsernameExists(string username)
		{
			if (_userRepo.GetByUsername(username) == null)
				return false;
			return true;
		}
	}
}
