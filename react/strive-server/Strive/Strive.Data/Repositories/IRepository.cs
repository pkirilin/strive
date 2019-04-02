namespace Strive.Data.Repositories
{
	public interface IRepository<TEntity> where TEntity : class
	{
		TEntity Add(TEntity newEntity);
	}
}
