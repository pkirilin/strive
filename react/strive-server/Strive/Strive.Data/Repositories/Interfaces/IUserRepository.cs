using Strive.Data.Entities;

namespace Strive.Data.Repositories.Interfaces
{
	public interface IUserRepository : IRepository<User>
	{
		User GetByEmail(string email);

		User GetByUsername(string username);
	}
}
