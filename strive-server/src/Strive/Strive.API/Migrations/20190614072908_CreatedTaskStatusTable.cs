using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Strive.API.Migrations
{
    public partial class CreatedTaskStatusTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "Task",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "StatusId",
                table: "Task",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Project",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateTable(
                name: "TaskStatus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Label = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskStatus", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "TaskStatus",
                columns: new[] { "Id", "Label" },
                values: new object[,]
                {
                    { 1, "Planned" },
                    { 2, "In process" },
                    { 3, "Completed" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Task_StatusId",
                table: "Task",
                column: "StatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Task_Status",
                table: "Task",
                column: "StatusId",
                principalTable: "TaskStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.Sql("update \"Task\" set \"StatusId\" = 1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Task_Status",
                table: "Task");

            migrationBuilder.DropTable(
                name: "TaskStatus");

            migrationBuilder.DropIndex(
                name: "IX_Task_StatusId",
                table: "Task");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Task");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "Task",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Project",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.Sql("update \"Task\" set \"StatusId\" = null");
        }
    }
}
