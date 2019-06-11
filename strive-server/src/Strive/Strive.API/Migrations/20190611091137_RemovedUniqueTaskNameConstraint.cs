using Microsoft.EntityFrameworkCore.Migrations;

namespace Strive.API.Migrations
{
    public partial class RemovedUniqueTaskNameConstraint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IN_Task_Name_ProjectId",
                table: "Task");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IN_Task_Name_ProjectId",
                table: "Task",
                columns: new[] { "Name", "ProjectId" },
                unique: true);
        }
    }
}
