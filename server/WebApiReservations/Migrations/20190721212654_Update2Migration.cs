using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApiReservations.Migrations
{
    public partial class Update2Migration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Day",
                table: "Reservations",
                newName: "To");

            migrationBuilder.AddColumn<DateTime>(
                name: "From",
                table: "Reservations",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "PersonId",
                table: "Reservations",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Person",
                columns: table => new
                {
                    PersonId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Person", x => x.PersonId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_PersonId",
                table: "Reservations",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Person_PersonId",
                table: "Reservations",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "PersonId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Person_PersonId",
                table: "Reservations");

            migrationBuilder.DropTable(
                name: "Person");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_PersonId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "From",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "PersonId",
                table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "To",
                table: "Reservations",
                newName: "Day");
        }
    }
}
