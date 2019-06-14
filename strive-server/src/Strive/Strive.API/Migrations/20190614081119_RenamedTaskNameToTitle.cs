using Microsoft.EntityFrameworkCore.Migrations;

namespace Strive.API.Migrations
{
    public partial class RenamedTaskNameToTitle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Task",
                newName: "Title");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Task",
                newName: "Name");
        }
    }
}
