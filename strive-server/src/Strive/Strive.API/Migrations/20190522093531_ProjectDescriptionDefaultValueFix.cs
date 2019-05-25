using Microsoft.EntityFrameworkCore.Migrations;

namespace Strive.API.Migrations
{
    public partial class ProjectDescriptionDefaultValueFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Project",
                maxLength: 511,
                nullable: true,
                defaultValue: "",
                oldClrType: typeof(string),
                oldMaxLength: 511);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Project",
                maxLength: 511,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 511,
                oldNullable: true,
                oldDefaultValue: "");
        }
    }
}