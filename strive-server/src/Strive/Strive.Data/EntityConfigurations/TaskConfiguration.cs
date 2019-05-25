using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Strive.Data.Entities;

namespace Strive.Data.EntityConfigurations
{
    public class TaskConfiguration : IEntityTypeConfiguration<Task>
    {
        public void Configure(EntityTypeBuilder<Task> builder)
        {
            builder.ToTable("Task");

            #region Properties

            builder.Property(task => task.Id)
                .HasColumnName("Id")
                .IsRequired(true)
                .ValueGeneratedOnAdd();

            builder.Property(task => task.Name)
                .HasColumnName("Name")
                .IsRequired(true)
                .HasMaxLength(255);

            builder.Property(task => task.Description)
                .HasColumnName("Description")
                .IsRequired(false)
                .HasDefaultValue("")
                .HasMaxLength(511);

            #endregion

            #region Constraints

            builder.HasKey(task => task.Id)
                .HasName("PK_Task");

            builder.HasIndex(task => new {task.Name, task.ProjectId})
                .HasName("IN_Task_Name_ProjectId")
                .IsUnique(true);

            #endregion

            #region ForeignKeys

            builder.HasOne(task => task.Project)
                .WithMany(project => project.Tasks)
                .HasForeignKey(task => task.ProjectId)
                .HasConstraintName("FK_Task_User")
                .OnDelete(DeleteBehavior.Cascade);

            #endregion
        }
    }
}