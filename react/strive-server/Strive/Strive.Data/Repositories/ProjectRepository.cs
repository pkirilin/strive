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
				_dbContext.Projects.Add(project);
				_dbContext.SaveChanges();
				return project;
			}
			catch (Exception)
			{
				throw;
			}
		}
    }
}
