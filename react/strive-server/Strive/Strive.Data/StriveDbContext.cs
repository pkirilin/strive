using Microsoft.EntityFrameworkCore;
using Strive.Data.Entities;

namespace Strive.Data
{
	public class StriveDbContext : DbContext
	{
		public StriveDbContext(DbContextOptions<StriveDbContext> options) : base(options)
		{
		}

		public DbSet<User> Users { get; set; }
	}
}
