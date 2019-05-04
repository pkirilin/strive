using System.Collections.Generic;
using Strive.Data.Entities;

namespace Strive.Data.Services
{
    public interface IProjectService
	{
		/// <summary>
		/// Gets projects list by specified parameters
		/// </summary>
		/// <param name="userId">Projects owner id</param>
		/// <returns>Projects list</returns>
		List<Project> GetProjects(int userId);

        /// <summary>
        /// Creates a new project
        /// </summary>
        /// <param name="project">Project data</param>
        /// <returns>Added project</returns>
	    Project Create(Project project);

	    /// <summary>
	    /// Checks if project with specified name for specified user is already exists
	    /// </summary>
	    /// <param name="projectName">Project name</param>
	    /// <param name="userId">Project owner id</param>
	    bool IsProjectExists(string projectName, int userId);

        /// <summary>
        /// Checks if project with specified id exists
        /// </summary>
        /// <param name="projectId">Specified project id</param>
        bool IsProjectExists(int projectId);
    }
}
