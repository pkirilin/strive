using System.Collections.Generic;
using Strive.Data.Entities;
using Strive.Data.Repositories;

namespace Strive.Data.Services
{
	public class ProjectService : IProjectService
	{
		private readonly IProjectRepository _projectRepo;

		public ProjectService(IProjectRepository projectRepo)
		{
			_projectRepo = projectRepo;
		}

		public List<Project> GetProjects(int userId)
		{
			throw new System.NotImplementedException();
		}
	}
}
