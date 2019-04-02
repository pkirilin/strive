using System;
using System.Linq;
using Strive.Data.Entities;

namespace Strive.Data.Repositories
{
	public class UserRepository : RepositoryBase, IUserRepository
	{
		public UserRepository(StriveDbContext dbContext) : base(dbContext)
		{
		}

		public User Add(User newEntity)
		{
			try
			{
				_dbContext.Users.Add(newEntity);
				_dbContext.SaveChanges();
				return newEntity;
			}
			catch (Exception)
			{
				return null;
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
