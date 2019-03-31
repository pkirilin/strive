using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Strive.Data.Entities;
using Strive.Helpers.Settings;

namespace Strive.Data
{
	public class StriveDbContext : DbContext
	{
		private readonly DatabaseSettings _dbSettings;

		public StriveDbContext(
			DbContextOptions<StriveDbContext> dbContextOptions,
			IOptions<DatabaseSettings> dbSettings) : base(dbContextOptions)
		{
			_dbSettings = dbSettings.Value;

			Database.EnsureCreated();
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseNpgsql(_dbSettings.ConnectionString);
		}

		public DbSet<User> Users { get; set; }
	}
}
