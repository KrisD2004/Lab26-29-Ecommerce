using Microsoft.EntityFrameworkCore;
using Labs26_29.Models;
namespace Labs26_29
{
    public class CommyDBContext: DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public CommyDBContext(DbContextOptions options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>().HasData(new Category("Groceries", "Food and all that junk stuff")
            {
                Id = 1,
                Name = "Groceries",
                Description = "Food and all that junk stuff"
            });

            modelBuilder.Entity<Category>().HasData(new Category("Clothes", "get that drip")
            {
                Id = 2,
                Name = "Clothes",
                Description = "get that drip"
            });

            modelBuilder.Entity<Category>().HasData(new Category("Electronics", "electrical things")
            {
                Id = 3,
                Name = "Electronics",
                Description = "electronic things "
            });

            modelBuilder.Entity<Category>().HasData(new Category("Jewelry", "mineral items and accessories")
            {
                Id = 4,
                Name = "Jewelry",
                Description = "mineral items and accessories"
            });

            modelBuilder.Entity<Category>().HasData(new Category("Home Appliances", "home items")
            {
                Id = 5,
                Name = "House Appliances",
                Description = "home items"
            });

            modelBuilder.Entity<Category>().HasData(new Category("Instruments", "musical items")
            {
                Id = 6,
                Name = "Instruments",
                Description = "musical items"
            });


            modelBuilder.Entity<Product>().HasOne<Category>().WithMany(c => c.Products).HasForeignKey(c => c.CategoryId);
        }
    }
}
