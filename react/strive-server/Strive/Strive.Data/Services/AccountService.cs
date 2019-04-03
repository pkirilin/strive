using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Exceptions;
using Strive.Helpers;
using System;

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
			if (String.IsNullOrEmpty(username) || String.IsNullOrEmpty(password))
				throw new ArgumentException("Authentication failed: username and/or password is empty");

			User user = _userRepo.GetByUsername(username);

			// Checking if user exists in db
			if (user == null)
				throw new StriveDatabaseException("Authentication failed: user not found");

			// Checking if password is correct
			bool isPasswordCorrect;
			try
			{
				isPasswordCorrect = SecurityHelpers.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt);
			}
			catch (Exception)
			{
				throw new StriveSecurityException("Authentication failed: wrong data passed for verifying password hash");
			}
			
			if (isPasswordCorrect == false)
				throw new StriveSecurityException("Authentication failed: incorrect password");

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
