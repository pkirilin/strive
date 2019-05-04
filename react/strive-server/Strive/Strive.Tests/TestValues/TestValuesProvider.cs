using System.Collections.Generic;
using Strive.Data.Entities;

namespace Strive.Tests.TestValues
{
    public static class TestValuesProvider
	{
		public static List<Project> GetProjects()
		{
			return new List<Project>()
			{
				new Project()
				{
                    Id = 1,
					Name = "Test 1 name",
					Description = "Test 1 description",
					UserId = 1
				},
				new Project()
				{
                    Id = 2,
					Name = "Test 2 name",
					Description = "Test 2 description",
					UserId = 1
				}
			};
		}
	}
}
