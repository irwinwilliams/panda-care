using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data.Migrations
{
    /// <inheritdoc />
    public partial class One : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Parents",
                columns: table => new
                {
                    parentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    parentName = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    phone = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    address = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Parents__90658C989A628808", x => x.parentId);
                });

            migrationBuilder.CreateTable(
                name: "Children",
                columns: table => new
                {
                    childId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    childName = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    dateOfBirth = table.Column<DateTime>(type: "date", nullable: true),
                    medicalConditions = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    ParentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Children__223925CDAC2B524B", x => x.childId);
                    table.ForeignKey(
                        name: "FK_Children_Parents_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Parents",
                        principalColumn: "parentId");
                });

            migrationBuilder.CreateTable(
                name: "ConversationalReferences",
                columns: table => new
                {
                    referenceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    parentId = table.Column<int>(type: "int", nullable: true),
                    conversationReference = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Conversa__7B826DDE3965AD9D", x => x.referenceId);
                    table.ForeignKey(
                        name: "FK__Conversat__paren__60A75C0F",
                        column: x => x.parentId,
                        principalTable: "Parents",
                        principalColumn: "parentId");
                });

            migrationBuilder.CreateTable(
                name: "DailyUpdates",
                columns: table => new
                {
                    updateId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    childId = table.Column<int>(type: "int", nullable: true),
                    timeOfDay = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    updateType = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    comments = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__DailyUpd__3C748E7AD01BC7C0", x => x.updateId);
                    table.ForeignKey(
                        name: "FK__DailyUpda__child__6383C8BA",
                        column: x => x.childId,
                        principalTable: "Children",
                        principalColumn: "childId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Children_ParentId",
                table: "Children",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_ConversationalReferences_parentId",
                table: "ConversationalReferences",
                column: "parentId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyUpdates_childId",
                table: "DailyUpdates",
                column: "childId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConversationalReferences");

            migrationBuilder.DropTable(
                name: "DailyUpdates");

            migrationBuilder.DropTable(
                name: "Children");

            migrationBuilder.DropTable(
                name: "Parents");
        }
    }
}
