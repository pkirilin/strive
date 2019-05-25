using System.Collections.Generic;

namespace Strive.Data.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> GetAll();

        TEntity GetById(object id);

        TEntity Add(TEntity newEntity);

        TEntity Update(TEntity updatedEntity);

        TEntity Remove(TEntity entityForDelete);
    }
}