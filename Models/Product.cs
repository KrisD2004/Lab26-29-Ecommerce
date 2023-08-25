using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Labs26_29.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }


        public double Price { get; set; }


        [ForeignKey("Id")]

        public int CategoryId { get; set; }

        public Product (string name , string description, double price, int categoryId)
        {
            Name = name;
            Description = description;
            Price = price;
            CategoryId = categoryId;
            



        }



    }
}
