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
        /// Authenticates user by username and password
        /// </summary>
        /// <returns>Authenticated user if authentication successful, if not returns null</returns>
        public User Authenticate(string email, string password)
        {
            // Checking if username or password is filled
            if (String.IsNullOrEmpty(email) || String.IsNullOrEmpty(password))
                throw new ArgumentException("Authentication failed: username and/or password is empty");

            User user;

            try
            {
                user = _userRepo.GetSingleOrDefault(u => u.Email == email);
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to get user by email. Error message: {e.Message}");
            }

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
                throw new StriveSecurityException(
                    "Authentication failed: wrong data passed for verifying password hash");
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

            try
            {
                SecurityHelpers.CreatePasswordHash(password, out passwordHash, out passwordSalt);
                user.PasswordSalt = passwordSalt;
                user.PasswordHash = passwordHash;
            }
            catch (ArgumentException e)
            {
                throw new StriveSecurityException(e.Message);
            }

            try
            {
                _userRepo.Insert(user);
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to create user. Error message: {e.Message}");
            }

            return user;
        }

        public bool IsEmailExists(string email)
        {
            try
            {
                User user = _userRepo.GetSingleOrDefault(u => u.Email == email);
                if (user == null)
                    return false;
                return true;
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to check if user's account email exists. Error message: {e.Message}");
            }
        }

        public bool IsUsernameExists(string username)
        {
            try
            {
                User user = _userRepo.GetSingleOrDefault(u => u.Username == username);
                if (user == null)
                    return false;
                return true;
            }
            catch (Exception e)
            {
                throw new StriveDatabaseException($"Failed to check if user's account username exists. Error message: {e.Message}");
            }
        }
    }
}