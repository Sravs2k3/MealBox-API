using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MealBox.API.Data;
using MealBox.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MealBox.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);
        }
    }
}
