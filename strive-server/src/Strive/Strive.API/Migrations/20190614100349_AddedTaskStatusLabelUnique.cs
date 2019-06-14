using Microsoft.EntityFrameworkCore.Migrations;

namespace Strive.API.Migrations
{
    public partial class AddedTaskStatusLabelUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IN_TaskStatus_Label",
                table: "TaskStatus",
                column: "Label",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IN_TaskStatus_Label",
                table: "TaskStatus");
        }
    }
}
