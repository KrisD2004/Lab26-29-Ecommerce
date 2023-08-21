using System.ComponentModel.DataAnnotations;

namespace Labs26_29.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Category(string name, string description) 
        {
            Name = name;
            Description = description;

        }
    }
}
