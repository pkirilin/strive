using System;
using System.Collections.Generic;

namespace Strive.Data.Repositories
{
    /// <summary>
    /// Base app repository abstraction
    /// </summary>
    /// <typeparam name="TEntity">Entity type</typeparam>
    public interface IRepository<TEntity> where TEntity : StriveEntity
    {
        IEnumerable<TEntity> GetAll();

        //IQueryable<TEntity> Get();

        TEntity GetSingleOrDefault(Func<TEntity, bool> condition);

        TEntity GetById(object id);

        void Insert(TEntity entity);

        void Update(TEntity entity);

        void Delete(TEntity entity);
    }
}
