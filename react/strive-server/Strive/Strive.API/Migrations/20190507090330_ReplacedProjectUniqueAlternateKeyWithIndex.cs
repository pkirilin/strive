using Microsoft.EntityFrameworkCore.Migrations;

namespace Strive.API.Migrations
{
    public partial class ReplacedProjectUniqueAlternateKeyWithIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "UN_Project_Name_UserId",
                table: "Project");

            migrationBuilder.CreateIndex(
                name: "IN_Project_Name_UserId",
                table: "Project",
                columns: new[] { "Name", "UserId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IN_Project_Name_UserId",
                table: "Project");

            migrationBuilder.AddUniqueConstraint(
                name: "UN_Project_Name_UserId",
                table: "Project",
                columns: new[] { "Name", "UserId" });
        }
    }
}
