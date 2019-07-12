using System;
using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Data.Services.Interfaces;
using Strive.Exceptions;
using Strive.Helpers;

namespace Strive.Data.Services.Classes
{
    public class AccountService : IAccountService
    {
        private readonly IRepository<User> _userRepo;

        public AccountService(IRepository<User> userRepo)
        {
            _userRepo = userRepo;
        }

        /// <summary>
        /// Authorizes user by username and password
        /// </summary>
        /// <returns>Authorized user if authentication successful, if not returns null</returns>
        public User Authorize(string email, string password)
        {
            // Checking if username or password is filled
            if (String.IsNullOrEmpty(email) || String.IsNullOrEmpty(password))
                throw new StriveSecurityException("Authorization failed", "Username and/or password is empty");

            User user;

            try
            {
                user = _userRepo.GetSingleOrDefault(u => u.Email == email);
            }
            catch (Exception)
            {
                throw new StriveDatabaseException("Authorization failed", "Failed to find user");
            }

            // Checking if user exists in db
            if (user == null)
                throw new StriveSecurityException("Authorization failed", "User not found");

            // Checking if password is correct
            bool isPasswordCorrect = false;
            try
            {
                isPasswordCorrect = SecurityHelpers.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt);
            }
            catch (Exception)
            {
                throw new StriveSecurityException(
                    "Authorization failed", "Wrong data passed for verifying password hash");
            }

            if (isPasswordCorrect == false)
                throw new StriveSecurityException("Authorization failed", "Incorrect password");

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

            try
            {
                SecurityHelpers.CreatePasswordHash(password, out passwordHash, out passwordSalt);
                user.PasswordSalt = passwordSalt;
                user.PasswordHash = passwordHash;
            }
            catch (ArgumentException e)
            {
                throw new StriveSecurityException("Failed to create password hash", e.Message);
            }

            try
            {
                _userRepo.Insert(user);
            }
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to create user");
            }

            return user;
        }

        /// <summary>
        /// Checks if user's account email exists
        /// </summary>
        /// <param name="email">Email</param>
        public bool IsEmailExists(string email)
        {
            try
            {
                User user = _userRepo.GetSingleOrDefault(u => u.Email == email);
                if (user == null)
                    return false;
                return true;
            }
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to check if user's account email exists");
            }
        }

        /// <summary>
        /// Checks if username exists
        /// </summary>
        /// <param name="username">Username</param>
        /// <returns></returns>
        public bool IsUsernameExists(string username)
        {
            try
            {
                User user = _userRepo.GetSingleOrDefault(u => u.Username == username);
                if (user == null)
                    return false;
                return true;
            }
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to check if user's account username exists");
            }
        }
    }
}