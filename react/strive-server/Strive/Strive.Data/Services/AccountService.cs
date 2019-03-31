﻿using System;
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

			_dbContext.Users.Add(user);
			_dbContext.SaveChanges();

			return user;
		}

		/// <summary>
		/// Checks if user with specified email already exists
		/// </summary>
		/// <param name="email">Email from request</param>
		public bool IsEmailExists(string email)
		{
			try
			{
				if (_dbContext.Users.SingleOrDefault(user => user.Email == email) == null)
					return false;
				return true;
			}
			catch (InvalidOperationException)
			{
				// Found more than one record
				return true;
			}
		}

		/// <summary>
		/// Checks if user with specified username already exists
		/// </summary>
		/// <param name="username">Username from request</param>
		public bool IsUsernameExists(string username)
		{
			try
			{
				if (_dbContext.Users.SingleOrDefault(user => user.Username == username) == null)
					return false;
				return true;
			}
			catch (InvalidOperationException)
			{
				// Found more than one record
				return true;
			}
		}
	}
}
