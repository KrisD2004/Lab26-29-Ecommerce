using Microsoft.EntityFrameworkCore;
using Labs26_29.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
namespace Labs26_29
{
    public class CommyDBContext: IdentityDbContext<ApplicationUsers>
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        public DbSet<ApplicationUsers> ApplicationUsers { get; set; }
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

            SeedRole(modelBuilder, "Admin", "create", "update", "delete", "read");
            var hasher = new PasswordHasher<ApplicationUsers>();
            var AdminUser = new ApplicationUsers
            {
                Id = "Admin-id",
                UserName = "Admin",
                NormalizedUserName = "ADMIN",
                Email = "ADMIN@example.com",
                NormalizedEmail = "ADMIN@EXAMPLE.COM",
                Password = "Password123!",
                Roles = new string[] { "Admin" },
                PasswordHash = hasher.HashPassword(null, "Password123!"),
            };

            modelBuilder.Entity<ApplicationUsers>().HasData(AdminUser);

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                UserId = AdminUser.Id,
                RoleId = "Admin" // This should match the ID used in the SeedRole method for the Admin role
            });

            // Generate the Editor role for the specified user

            SeedRole(modelBuilder, "Editor", "create", "update");
            var EditorUser = new ApplicationUsers
            {
                Id = "Editor-id",
                UserName = "Editor",
                NormalizedUserName = "EDITOR",
                Email = "editor@example.com",
                NormalizedEmail = "editor@example.com",
                Password = "Password123!",
                Roles = new string[] { "Editor" },
                PasswordHash = hasher.HashPassword(null, "Password123!")

            };

            modelBuilder.Entity<ApplicationUsers>().HasData(EditorUser);

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                UserId = EditorUser.Id,
                RoleId = "Editor"

            });
        }
        private int nextId = 1000;

        private void SeedRole(ModelBuilder modelBuilder, string roleName, params string[] permissions)
        {
            var role = new IdentityRole
            {
                Id = roleName.ToLower(),
                Name = roleName,
                NormalizedName = roleName.ToUpper(),
                ConcurrencyStamp = Guid.Empty.ToString()
            };

            modelBuilder.Entity<IdentityRole>().HasData(role);

            // Go through the permissions list (the params) and seed a new entry for each
            var roleClaims = permissions.Select(permission =>
              new IdentityRoleClaim<string>
              {
                  Id = nextId++,
                  RoleId = role.Id,
                  ClaimType = "permissions", // This matches what we did in Startup.cs
                  ClaimValue = permission
              }).ToArray();

            modelBuilder.Entity<IdentityRoleClaim<string>>().HasData(roleClaims);
        }
    }
}
