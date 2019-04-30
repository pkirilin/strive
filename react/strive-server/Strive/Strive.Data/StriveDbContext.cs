using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Strive.Data.Entities;
using Strive.Data.EntityConfigurations;
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
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseNpgsql(_dbSettings.ConnectionString, b => b.MigrationsAssembly("Strive.API"));
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.ApplyConfiguration(new UserConfiguration());
		}

		public DbSet<User> Users { get; set; }
	}
}
