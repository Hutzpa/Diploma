using Microsoft.EntityFrameworkCore;
using MyDiploma.Entities;

namespace MyDiploma.Data
{
    public class DiplomaContext : DbContext 
    {
        public DiplomaContext(DbContextOptions<DiplomaContext> options)
          : base(options)
        {
            Database.Migrate();
        }

        public DbSet<User> Users { get; set; }

        public DbSet<ChatRoom> ChatRooms { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Participants> Participants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasKey(o => new {o.Id });
            modelBuilder.Entity<User>().HasIndex(o => o.Username).IsUnique();

            modelBuilder.Entity<Participants>().HasKey(o => new { o.UserId, o.ChatRoomId });

            modelBuilder.Entity<Contact>().HasKey(o => new { o.SenderId, o.ReceiverId });
            modelBuilder.Entity<User>().HasMany(o => o.Contacts).WithOne(o => o.Sender).IsRequired().HasForeignKey(o => o.SenderId).OnDelete(DeleteBehavior.NoAction);

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
