using System.Collections.Generic;
using Strive.Data.Entities;

namespace Strive.Data.Services.Interfaces
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
        /// Gets a project entity by specified id
        /// </summary>
        /// <param name="projectId">Target project id</param>
        /// <returns>Project entity if project was found, null if not</returns>
        Project GetProjectById(int projectId);

        /// <summary>
        /// Creates a new project
        /// </summary>
        /// <param name="project">Project to create</param>
        /// <returns>Added project</returns>
        Project Create(Project project);

        /// <summary>
        /// Updates specified project
        /// </summary>
        /// <param name="project">Project for update</param>
        /// <returns>Updated project</returns>
        Project Update(Project project);

        /// <summary>
        /// Deletes specified project
        /// </summary>
        /// <param name="project">Project for delete</param>
        /// <returns>Deleted project</returns>
        Project Delete(Project project);

        /// <summary>
        /// Checks if project with specified name for specified user is already exists
        /// </summary>
        /// <param name="projectName">Project name</param>
        /// <param name="userId">Project owner id</param>
        bool IsProjectExists(string projectName, int userId);
    }
}