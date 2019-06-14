using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Strive.Data.Entities;

namespace Strive.Data.EntityConfigurations
{
    public class TaskStatusConfiguration : IEntityTypeConfiguration<TaskStatus>
    {
        public void Configure(EntityTypeBuilder<TaskStatus> builder)
        {
            builder.ToTable("TaskStatus");

            #region Properties

            builder.Property(status => status.Id)
                .HasColumnName("Id")
                .IsRequired(true)
                .ValueGeneratedOnAdd();

            builder.Property(status => status.Label)
                .HasColumnName("Label")
                .IsRequired(true)
                .HasMaxLength(255);

            #endregion

            #region Constraints

            builder.HasKey(status => status.Id)
                .HasName("PK_TaskStatus");

            #endregion

            #region Init data

            builder.HasData(new TaskStatus[]
            {
                new TaskStatus()
                {
                    Id = 1,
                    Label = "Planned"
                },
                new TaskStatus()
                {
                    Id = 2,
                    Label = "In process"
                },
                new TaskStatus()
                {
                    Id = 3,
                    Label = "Completed"
                }
            });

            #endregion
        }
    }
}
