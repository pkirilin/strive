using System;
using System.Collections.Generic;
using System.Text;
using Strive.Data.Entities;

namespace Strive.Tests.TestValues
{
	public static class TestValuesProvider
	{
		public static List<Project> GetProjects(int userId)
		{
			return new List<Project>()
			{
				new Project()
				{
					Name = "Test 1 name",
					Description = "Test 1 description",
					UserId = userId
				},
				new Project()
				{
					Name = "Test 2 name",
					Description = "Test 2 description",
					UserId = userId
				}
			};
		}
	}
}
