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

		/// <summary>
		/// Gets projects list by specified parameters
		/// </summary>
		/// <param name="userId">Projects owner id</param>
		/// <returns>Projects list</returns>
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

	    /// <summary>
	    /// Creates a new project
	    /// </summary>
	    /// <param name="project">Project data</param>
	    /// <returns>Added project</returns>
	    public Project Create(Project project)
	    {
	        if (project == null)
	            throw new ArgumentNullException("Failed to add project. Project cannot be null");

	        try
	        {
	            _projectRepo.Add(project);
	            return project;
            }
	        catch (Exception e)
	        {
	            throw new StriveDatabaseException($"Failed to add project. Error message: {e.Message}");
	        }
	    }

        /// <summary>
        /// Deletes specified project
        /// </summary>
        /// <param name="project">Project data</param>
	    public void Delete(Project project)
	    {
            if(project == null)
                throw new ArgumentNullException("Failed to delete project. Project cannot be null");

	        try
	        {
	            _projectRepo.Remove(project);
            }
	        catch (Exception e)
	        {
	            throw new StriveDatabaseException($"Failed to delete project. Error message: {e.Message}");
	        }
	    }

        /// <summary>
        /// Checks if project with specified name for specified user is already exists
        /// </summary>
        /// <param name="projectName">Project name</param>
        /// <param name="userId">Project owner id</param>
	    public bool IsProjectExists(string projectName, int userId)
	    {
	        Project targetProject;

	        try
	        {
	            targetProject = _projectRepo.GetAll()
	                .Where(project => project.Name == projectName && project.UserId == userId)
	                .FirstOrDefault();

	            if (targetProject == null)
	                return false;
	            return true;
	        }
	        catch (Exception e)
	        {
                throw new StriveDatabaseException($"Cannot check if project is exists. Error message: {e.Message}");
            }
	    }

	    /// <summary>
	    /// Checks if project with specified id exists
	    /// </summary>
	    /// <param name="projectId">Specified project id</param>
        public bool IsProjectExists(int projectId)
	    {
	        Project targetProject;

	        try
	        {
	            targetProject = _projectRepo.GetById(projectId);

	            if (targetProject == null)
	                return false;
	            return true;
	        }
	        catch (Exception e)
	        {
	            throw new StriveDatabaseException($"Cannot check if project is exists. Error message: {e.Message}");
            }
        }
    }
}
