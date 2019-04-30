using System;
using System.Collections.Generic;
using System.Linq;
using Strive.Data.Entities;

namespace Strive.Data.Repositories
{
	public class UserRepository : RepositoryBase, IUserRepository
	{
		public UserRepository(StriveDbContext dbContext) : base(dbContext)
		{
		}

		public IEnumerable<User> GetAll()
		{
			try
			{
				return _dbContext.Users.AsEnumerable();
			}
			catch (Exception)
			{
				throw;
			}
		}

		public User Add(User user)
		{
			try
			{
				_dbContext.Users.Add(user);
				_dbContext.SaveChanges();
				return user;
			}
			catch (Exception)
			{
				throw;
			}
		}

		public User GetByEmail(string email)
		{
			User user;
			try
			{
				user = _dbContext.Users.SingleOrDefault(u => u.Email == email);
				return user;
			}
			catch (Exception)
			{
				return null;
			}
		}

		public User GetByUsername(string username)
		{
			User user;
			try
			{
				user = _dbContext.Users.SingleOrDefault(u => u.Username == username);
				return user;
			}
			catch (Exception)
			{
				return null;
			}
		}
	}
}
