using System;
using System.Collections.Generic;
using System.Linq;
using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Data.Services.Interfaces;
using Strive.Exceptions;

namespace Strive.Data.Services.Classes
{
    public class ProjectService : IProjectService
    {
        private readonly IRepository<Project> _projectRepo;

        public ProjectService(IRepository<Project> projectRepo)
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
            try
            {
                return _projectRepo.GetAll()
                    .Where(project => project.UserId == userId)
                    .OrderBy(project => project.Name)
                    .ToList();
            }
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to get project list from database");
            }
        }

        /// <summary>
        /// Gets a project entity by specified id
        /// </summary>
        /// <param name="projectId">Target project id</param>
        /// <returns>Project entity if project was found, null if not</returns>
        public Project GetProjectById(int projectId)
        {
            try
            {
                return _projectRepo.GetById(projectId);
            }
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to get project from database");
            }
        }

        /// <summary>
        /// Creates a new project
        /// </summary>
        /// <param name="project">Project data</param>
        /// <returns>Added project</returns>
        public void Create(Project project)
        {
            if (project == null)
                throw new ArgumentNullException("Failed to add project. Project cannot be null");

            try
            {
                _projectRepo.Insert(project);
            }
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to create project");
            }
        }

        /// <summary>
        /// Updates specified project
        /// </summary>
        /// <param name="project">Project for update</param>
        /// <returns>Updated project</returns>
        public void Update(Project project)
        {
            if (project == null)
                throw new ArgumentNullException("Failed to update project. Updated project cannot be null");

            try
            {
                _projectRepo.Update(project);
            }
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to update project");
            }
        }

        /// <summary>
        /// Deletes specified project
        /// </summary>
        /// <param name="project">Project for delete</param>
        /// <returns>Deleted project</returns>
        public void Delete(Project project)
        {
            if (project == null)
                throw new ArgumentNullException("Failed to delete project. Project cannot be null");

            try
            {
                _projectRepo.Delete(project);
            }
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to delete project");
            }
        }

        /// <summary>
        /// Checks if project with specified name for specified user is already exists
        /// </summary>
        /// <param name="projectName">Project name</param>
        /// <param name="userId">Project owner id</param>
        public bool IsProjectExists(string projectName, int userId)
        {
            try
            {
                Project targetProject = _projectRepo.GetAll()
                    .Where(project => project.Name == projectName && project.UserId == userId)
                    .FirstOrDefault();

                if (targetProject == null)
                    return false;
                return true;
            }
            catch (Exception)
            {
                throw new StriveDatabaseException("Failed to check if project exists");
            }
        }
    }
}