using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Strive.Data.Entities;

namespace Strive.Data.EntityConfigurations
{
	public class ProjectConfiguration : IEntityTypeConfiguration<Project>
	{
		public void Configure(EntityTypeBuilder<Project> builder)
		{
			builder.ToTable("Project");

			#region Properties

			builder.Property(project => project.Id)
				.HasColumnName("Id")
				.IsRequired(true)
				.ValueGeneratedOnAdd();

			builder.Property(project => project.Name)
				.HasColumnName("Name")
				.IsRequired(true)
				.HasMaxLength(255);

			builder.Property(project => project.Description)
				.HasColumnName("Description")
				.IsRequired(true)
				.HasMaxLength(511);

			#endregion

			#region Keys

			builder.HasKey(project => project.Id)
				.HasName("PK_Project");

			builder.HasAlternateKey(project => new { project.Name, project.UserId })
				.HasName("UN_Project_Name_UserId");

			#endregion

			#region ForeignKeys

			builder.HasOne(project => project.User)
				.WithMany(user => user.Projects)
				.HasForeignKey(project => project.UserId)
				.HasConstraintName("FK_Project_User")
				.OnDelete(DeleteBehavior.Cascade);

			#endregion
		}
	}
}
