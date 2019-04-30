using System.Collections.Generic;
using Strive.Data.Entities;

namespace Strive.Data.Services
{
	public interface IProjectService
	{
		List<Project> GetProjects(int userId);
	}
}
