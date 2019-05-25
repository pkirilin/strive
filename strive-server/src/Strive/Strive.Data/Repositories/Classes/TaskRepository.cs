using System.Collections.Generic;
using System.Linq;
using Strive.Data.Entities;
using Strive.Data.Repositories.Interfaces;

namespace Strive.Data.Repositories.Classes
{
    public class TaskRepository : RepositoryBase, ITaskRepository
    {
        public TaskRepository(StriveDbContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<Task> GetAll()
        {
            return _dbContext.Tasks.AsEnumerable();
        }

        public Task GetById(object id)
        {
            int TaskId = (int) id;
            return _dbContext.Tasks.Find(TaskId);
        }

        public Task Add(Task Task)
        {
            var TaskEntry = _dbContext.Tasks.Add(Task);
            _dbContext.SaveChanges();
            return TaskEntry.Entity;
        }

        public Task Update(Task Task)
        {
            var TaskEntry = _dbContext.Tasks.Update(Task);
            _dbContext.SaveChanges();
            return TaskEntry.Entity;
        }

        public Task Remove(Task Task)
        {
            var TaskEntry = _dbContext.Tasks.Remove(Task);
            _dbContext.SaveChanges();
            return TaskEntry.Entity;
        }
    }
}