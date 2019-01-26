using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Strive.Web.App.Models;

namespace Strive.Web.App
{
	public class StriveDbContext : IdentityDbContext<User>
	{
		public StriveDbContext(DbContextOptions<StriveDbContext> options)
			: base(options)
		{
			Database.EnsureCreated();
		}
	}
}
