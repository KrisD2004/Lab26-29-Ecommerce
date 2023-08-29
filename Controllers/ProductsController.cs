using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Labs26_29;
using Labs26_29.Models;

namespace Labs26_29.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : Controller
    {

        private readonly CommyDBContext _context;

        public ProductsController(CommyDBContext context)
        {
            _context = context;
        }

        // GET: Products
        [HttpGet]
        public async Task<IEnumerable<Product>> GetProduct()
        {
            var product = _context.Products.ToList();
            return product;
        }

        
        [HttpPost]

        public async Task<ActionResult> CreateProduct(string Name, string Description, float Price, int CategoryId)
        {
            Product products = new Product(Name, Description, Price, CategoryId);
            _context.Products.Add(products);
            _context.SaveChanges();
            return Ok(products);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            Product ProductToDelete = await _context.Products.FindAsync(id);
            _context.Products.Remove(ProductToDelete);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int Id,[FromBody] Product updatedProduct)
        {
            var existingProduct =  _context.Products.Find(Id);
            if (existingProduct == null)
            {
                return NotFound();
            }
            existingProduct.Name = updatedProduct.Name;
            existingProduct.Description = updatedProduct.Description;
            existingProduct.Price = updatedProduct.Price;
             _context.SaveChanges();


            return Ok(existingProduct);


        }

       // private bool ProductExists(int id)
       // {
         // return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
       // }
    }
}
