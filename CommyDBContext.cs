using Microsoft.EntityFrameworkCore;
using Labs26_29.Models;
namespace Labs26_29
{
    public class CommyDBContext: DbContext
    {
        public DbSet<Category> Categories { get; set; }

        public CommyDBContext(DbContextOptions options): base(options)
        {

        }
    }
}
