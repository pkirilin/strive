using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Strive.Data.Entities;

namespace Strive.Data.EntityConfigurations
{
	internal class UserConfiguration : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			builder.ToTable("User");

			builder.HasKey(user => user.Id)
				.HasName("PK_User");

			builder.HasAlternateKey(user => user.Email)
				.HasName("UN_User_Email");

			builder.HasAlternateKey(user => user.Username)
				.HasName("UN_User_Username");

			builder.Property(user => user.Id)
				.HasColumnName("Id")
				.IsRequired(true)
				.ValueGeneratedOnAdd();

			builder.Property(user => user.Email)
				.HasColumnName("Email")
				.IsRequired(true)
				.HasMaxLength(255);

			builder.Property(user => user.Username)
				.HasColumnName("Username")
				.IsRequired(true)
				.HasMaxLength(255);

			builder.Property(user => user.PasswordHash)
				.HasColumnName("PasswordHash")
				.IsRequired(true);

			builder.Property(user => user.PasswordSalt)
				.HasColumnName("PasswordSalt")
				.IsRequired(true);
		}
	}
}
