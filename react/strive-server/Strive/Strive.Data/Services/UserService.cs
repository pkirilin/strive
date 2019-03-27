namespace Strive.Data.Services
{
	public class UserService : IUserService
	{
		private readonly StriveDbContext _db;

		public UserService(StriveDbContext pdb)
		{
			_db = pdb;
		}
	}
}
