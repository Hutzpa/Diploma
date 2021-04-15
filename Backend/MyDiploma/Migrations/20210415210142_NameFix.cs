using Microsoft.EntityFrameworkCore.Migrations;

namespace MyDiploma.Migrations
{
    public partial class NameFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Users_User1Id",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Users_User2Id",
                table: "Contacts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Contacts",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_User2Id",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "User1Id",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "User2Id",
                table: "Contacts");

            migrationBuilder.AddColumn<int>(
                name: "SenderId",
                table: "Contacts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ReceiverId",
                table: "Contacts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contacts",
                table: "Contacts",
                columns: new[] { "SenderId", "ReceiverId" });

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_ReceiverId",
                table: "Contacts",
                column: "ReceiverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Users_ReceiverId",
                table: "Contacts",
                column: "ReceiverId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Users_SenderId",
                table: "Contacts",
                column: "SenderId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Users_ReceiverId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Users_SenderId",
                table: "Contacts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Contacts",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_ReceiverId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "SenderId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "ReceiverId",
                table: "Contacts");

            migrationBuilder.AddColumn<int>(
                name: "User1Id",
                table: "Contacts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "User2Id",
                table: "Contacts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contacts",
                table: "Contacts",
                columns: new[] { "User1Id", "User2Id" });

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_User2Id",
                table: "Contacts",
                column: "User2Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Users_User1Id",
                table: "Contacts",
                column: "User1Id",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Users_User2Id",
                table: "Contacts",
                column: "User2Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
