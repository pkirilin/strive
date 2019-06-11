﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Strive.Data;

namespace Strive.API.Migrations
{
    [DbContext(typeof(StriveDbContext))]
    partial class StriveDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Strive.Data.Entities.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("Id");

                    b.Property<string>("Description")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("Description")
                        .HasMaxLength(511)
                        .HasDefaultValue("");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("Name")
                        .HasMaxLength(255);

                    b.Property<int>("UserId");

                    b.HasKey("Id")
                        .HasName("PK_Project");

                    b.HasIndex("UserId");

                    b.HasIndex("Name", "UserId")
                        .IsUnique()
                        .HasName("IN_Project_Name_UserId");

                    b.ToTable("Project");
                });

            modelBuilder.Entity("Strive.Data.Entities.Task", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("Id");

                    b.Property<string>("Description")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("Description")
                        .HasMaxLength(511)
                        .HasDefaultValue("");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("Name")
                        .HasMaxLength(255);

                    b.Property<int>("ProjectId");

                    b.HasKey("Id")
                        .HasName("PK_Task");

                    b.HasIndex("ProjectId");

                    b.ToTable("Task");
                });

            modelBuilder.Entity("Strive.Data.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("Id");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnName("Email")
                        .HasMaxLength(255);

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnName("PasswordHash");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnName("PasswordSalt");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnName("Username")
                        .HasMaxLength(255);

                    b.HasKey("Id")
                        .HasName("PK_User");

                    b.HasAlternateKey("Email")
                        .HasName("UN_User_Email");

                    b.HasAlternateKey("Username")
                        .HasName("UN_User_Username");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Strive.Data.Entities.Project", b =>
                {
                    b.HasOne("Strive.Data.Entities.User", "User")
                        .WithMany("Projects")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_Project_User")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Strive.Data.Entities.Task", b =>
                {
                    b.HasOne("Strive.Data.Entities.Project", "Project")
                        .WithMany("Tasks")
                        .HasForeignKey("ProjectId")
                        .HasConstraintName("FK_Task_Project")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
