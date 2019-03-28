using System.Linq;
using Strive.Data.Entities;
using Strive.Helpers;

namespace Strive.Data.Services
{
	public class AccountService : IAccountService
	{
		private readonly StriveDbContext _dbContext;

		public AccountService(StriveDbContext dbContext)
		{
			_dbContext = dbContext;
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

			User user = _dbContext.Users.SingleOrDefault(u => u.Username == username);

			// Checking if user exists in db
			if (user == null)
				return null;

			// Checking if password is correct
			if (!SecurityHelpers.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
				return null;

			// Authentication successful
			return user;
		}
	}
}
