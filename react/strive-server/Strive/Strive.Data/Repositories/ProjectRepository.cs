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
		    return _dbContext.Projects.AsEnumerable();
        }

	    public Project GetById(object id)
	    {
	        int projectId = (int)id;
	        return _dbContext.Projects.Find(projectId);
        }

        public Project Add(Project project)
		{
		    var projectEntry = _dbContext.Projects.Add(project);
		    _dbContext.SaveChanges();
		    return projectEntry.Entity;
        }

	    public Project Update(Project project)
	    {
	        var projectEntry = _dbContext.Projects.Update(project);
	        _dbContext.SaveChanges();
	        return projectEntry.Entity;
        }

        public Project Remove(Project project)
	    {
	        var projectEntry = _dbContext.Projects.Remove(project);
	        _dbContext.SaveChanges();
	        return projectEntry.Entity;
        }
    }
}
