using System.Collections.Generic;
using System.Linq;
using Strive.Data.Entities;
using Strive.Data.Repositories.Interfaces;

namespace Strive.Data.Repositories.Classes
{
    public class UserRepository : RepositoryBase, IUserRepository
	{
		public UserRepository(StriveDbContext dbContext) : base(dbContext)
		{
		}

		public IEnumerable<User> GetAll()
		{
		    return _dbContext.Users.AsEnumerable();
        }

	    public User GetById(object id)
	    {
	        int userId = (int)id;
	        return _dbContext.Users.Find(userId);
        }

        public User Add(User user)
		{
		    _dbContext.Users.Add(user);
		    _dbContext.SaveChanges();
		    return user;
        }

	    public User Update(User user)
	    {
	        var userEntry = _dbContext.Users.Update(user);
	        _dbContext.SaveChanges();
	        return userEntry.Entity;
        }

        public User Remove(User user)
	    {
	        var userEntry = _dbContext.Users.Remove(user);
	        _dbContext.SaveChanges();
	        return userEntry.Entity;
        }

        public User GetByEmail(string email)
		{
		    return _dbContext.Users.SingleOrDefault(u => u.Email == email);
        }

        public User GetByUsername(string username)
		{
		    return _dbContext.Users.SingleOrDefault(u => u.Username == username);
        }
    }
}
