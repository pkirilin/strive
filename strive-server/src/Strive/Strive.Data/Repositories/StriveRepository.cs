using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Strive.Data.Repositories
{
    /// <summary>
    /// Implements all data access logic
    /// </summary>
    /// <typeparam name="TEntity">Entity type</typeparam>
    public class StriveRepository<TEntity> : IRepository<TEntity> 
        where TEntity : StriveEntity
    {
        private readonly StriveDbContext _context;

        public StriveRepository(StriveDbContext context)
        {
            _context = context ??
                throw new ArgumentNullException($"Failed to initialize {this.GetType().FullName}: db context is null");
        }

        /// <summary>
        /// The existing collection of entities
        /// </summary>
        private DbSet<TEntity> Entities
        {
            get
            {
                return _context.Set<TEntity>();
            }
        }

        /// <summary>
        /// Gets all entities from the existing collection
        /// </summary>
        /// <returns>Full collection of entities</returns>
        public IEnumerable<TEntity> GetAll()
        {
            return this.Entities;
        }

        /// <summary>
        /// Gets all entities from the existing collection as IQueryable
        /// </summary>
        /// <returns>Full collection of entities as IQueryable</returns>
        public IQueryable<TEntity> GetAllAsIQueryable()
        {
            return this.Entities;
        }

        /// <summary>
        /// Gets single entity by condition (SingleOrDefault wrapper)
        /// </summary>
        /// <param name="condition">Search condition function</param>
        /// <returns></returns>
        public TEntity GetSingleOrDefault(Func<TEntity, bool> condition)
        {
            return this.Entities.SingleOrDefault(condition);
        }

        /// <summary>
        /// Gets entity by primary key from the existing collection
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Entity</returns>
        public TEntity GetById(object id)
        {
            return this.Entities.Find(id);
        }

        /// <summary>
        /// Adds a new entity to the existing collection
        /// </summary>
        /// <param name="entity">New entity</param>
        public void Insert(TEntity entity)
        {
            this.Entities.Add(entity);
            _context.SaveChanges();
        }

        /// <summary>
        /// Updates specified entity in the existing collection
        /// </summary>
        /// <param name="entity">Updated entity</param>
        public void Update(TEntity entity)
        {
            this.Entities.Update(entity);
            _context.SaveChanges();
        }

        /// <summary>
        /// Updates multiple entities in the existing collection 
        /// </summary>
        /// <param name="entities">Entities for update</param>
        public void Update(IEnumerable<TEntity> entities)
        {
            this.Entities.UpdateRange(entities);
            _context.SaveChanges();
        }

        /// <summary>
        /// Deletes specified entity from the existing collection
        /// </summary>
        /// <param name="entity"></param>
        public void Delete(TEntity entity)
        {
            this.Entities.Remove(entity);
            _context.SaveChanges();
        }
    }
}
