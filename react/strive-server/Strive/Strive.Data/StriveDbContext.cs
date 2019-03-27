using Microsoft.EntityFrameworkCore;

namespace Strive.Data
{
	public class StriveDbContext : DbContext
	{
		public StriveDbContext(DbContextOptions<StriveDbContext> options) : base(options)
		{
		}
	}
}
