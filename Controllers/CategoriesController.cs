using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Labs26_29;
using Labs26_29.Models;
using Humanizer;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json.Linq;
using System.Reflection.Metadata;
using System.Threading.Channels;

namespace Labs26_29.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : Controller
    {
        private readonly CommyDBContext _context;

        public CategoriesController(CommyDBContext context)
        {
            _context = context;
        }


        [HttpGet]

        public async Task<IEnumerable<Category>> GetCategories()
        {
            var categories = _context.Categories.ToList();
            return categories;
        }

        [HttpPost]
        public async Task<ActionResult> CreateCategory(string Name, string  Description)
        {
            Category category = new Category(Name, Description);
            _context.Categories.Add(category);
            _context.SaveChanges();
            return Ok(category);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            Category categoryToDelete = await _context.Categories.FindAsync(id);
             _context.Categories.Remove(categoryToDelete);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateCategory(int Id, Category updatedCategory)
        {
             var existingCategory = await _context.Categories.FindAsync(Id);
            existingCategory.Name = updatedCategory.Name;
            existingCategory.Description = updatedCategory.Description;
            _context.Categories.Update(existingCategory);
            await _context.SaveChangesAsync();


            return Ok(existingCategory);


        }
        






    }
}
