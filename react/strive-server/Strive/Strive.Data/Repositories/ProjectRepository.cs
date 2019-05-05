using System;
using System.Collections.Generic;
using System.Linq;
using Strive.Data.Entities;

namespace Strive.Data.Repositories
{
	public class ProjectRepository : RepositoryBase, IProjectRepository
	{
		public ProjectRepository(StriveDbContext dbContext) : base(dbContext)
		{
		}

		public IEnumerable<Project> GetAll()
		{
			try
			{
				return _dbContext.Projects.AsEnumerable();
			}
			catch (Exception)
			{
				throw;
			}
		}

	    public Project GetById(object id)
	    {
	        int projectId = (int)id;

	        try
	        {
	            return _dbContext.Projects.Find(projectId);
	        }
	        catch (Exception)
	        {
	            throw;
	        }
	    }

        public Project Add(Project project)
		{
			try
			{
				var projectEntry = _dbContext.Projects.Add(project);
				_dbContext.SaveChanges();
				return projectEntry.Entity;
			}
			catch (Exception)
			{
				throw;
			}
		}

	    public Project Update(Project project)
	    {
	        try
	        {
	            var projectEntry = _dbContext.Projects.Update(project);
	            _dbContext.SaveChanges();
	            return projectEntry.Entity;
	        }
	        catch (Exception)
	        {
	            throw;
	        }
        }

        public Project Remove(Project project)
	    {
	        try
	        {
	            var projectEntry = _dbContext.Projects.Remove(project);
	            _dbContext.SaveChanges();
	            return projectEntry.Entity;
	        }
	        catch (Exception)
	        {
	            throw;
	        }
        }
    }
}
