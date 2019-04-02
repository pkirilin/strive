namespace Strive.Data.Repositories
{
	public class RepositoryBase
	{
		protected readonly StriveDbContext _dbContext;

		public RepositoryBase(StriveDbContext dbContext)
		{
			_dbContext = dbContext;
		}
	}
}
