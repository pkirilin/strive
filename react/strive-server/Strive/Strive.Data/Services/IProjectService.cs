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
	}
}
