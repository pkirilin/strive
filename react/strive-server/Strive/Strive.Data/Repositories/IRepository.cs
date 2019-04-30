using System.Collections.Generic;

namespace Strive.Data.Repositories
{
	public interface IRepository<TEntity> where TEntity : class
	{
		IEnumerable<TEntity> GetAll();

		TEntity Add(TEntity newEntity);
	}
}
