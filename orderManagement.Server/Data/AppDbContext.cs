using Microsoft.EntityFrameworkCore;
using orderManagement.Server.Data.Models;

namespace orderManagement.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Order> Orders { get; set; }   
        public DbSet<Product> Products { get; set; }
        public DbSet<Client> Clients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the Price property in the Products table
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18, 2)"); // Adjust the precision and scale as needed

            // Other configurations...

            base.OnModelCreating(modelBuilder);
        }
    }
}
