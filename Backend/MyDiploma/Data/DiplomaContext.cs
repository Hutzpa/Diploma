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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasKey(o => new {o.Id });
            modelBuilder.Entity<User>().HasIndex(o => o.Username).IsUnique();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
