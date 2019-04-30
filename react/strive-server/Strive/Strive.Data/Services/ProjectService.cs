using System;
using System.Collections.Generic;
using System.Linq;
using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Exceptions;

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
			List<Project> projects;

			try
			{
				projects = _projectRepo.GetAll()
					.Where(project => project.UserId == userId)
					.ToList();
			}
			catch (Exception e)
			{
				throw new StriveDatabaseException($"Failed to get projects from database. Error message: {e.Message}");
			}

			return projects;
		}
	}
}
