using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MealBox.API.Data;
using MealBox.API.Models;
using MealBox.API.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MealBox.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MealsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MealsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MealDto>>> GetMeals()
        {
            var meals = await _context.Meals.Include(m => m.Category).ToListAsync();

            var mealDtos = meals.Select(m => new MealDto
            {
                Id = m.Id,
                Name = m.Name,
                Description = m.Description,
                Price = m.Price,
                ImageUrl = m.ImageUrl,
                CategoryId = m.CategoryId,
                CategoryName = m.Category != null ? m.Category.Name : string.Empty,
                Calories = m.Calories,
                Protein = m.Protein,
                Carbs = m.Carbs,
                Fats = m.Fats,
                Ingredients = m.Ingredients,
                IsSpecial = m.IsSpecial,
                Rating = m.Rating,
                PreparationTime = m.PreparationTime
            }).ToList();

            return Ok(mealDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MealDto>> GetMeal(int id)
        {
            var meal = await _context.Meals.Include(m => m.Category).FirstOrDefaultAsync(m => m.Id == id);

            if (meal == null)
            {
                return NotFound();
            }

            var mealDto = new MealDto
            {
                Id = meal.Id,
                Name = meal.Name,
                Description = meal.Description,
                Price = meal.Price,
                ImageUrl = meal.ImageUrl,
                CategoryId = meal.CategoryId,
                CategoryName = meal.Category != null ? meal.Category.Name : string.Empty,
                Calories = meal.Calories,
                Protein = meal.Protein,
                Carbs = meal.Carbs,
                Fats = meal.Fats,
                Ingredients = meal.Ingredients,
                IsSpecial = meal.IsSpecial,
                Rating = meal.Rating,
                PreparationTime = meal.PreparationTime
            };

            return Ok(mealDto);
        }

        [HttpPost]
        public async Task<ActionResult<MealDto>> CreateMeal(MealDto mealDto)
        {
            var meal = new Meal
            {
                Name = mealDto.Name,
                Description = mealDto.Description,
                Price = mealDto.Price,
                ImageUrl = mealDto.ImageUrl,
                CategoryId = mealDto.CategoryId,
                Calories = mealDto.Calories,
                Protein = mealDto.Protein,
                Carbs = mealDto.Carbs,
                Fats = mealDto.Fats,
                Ingredients = mealDto.Ingredients,
                IsSpecial = mealDto.IsSpecial,
                Rating = mealDto.Rating,
                PreparationTime = mealDto.PreparationTime
            };

            _context.Meals.Add(meal);
            await _context.SaveChangesAsync();

            mealDto.Id = meal.Id;

            return CreatedAtAction(nameof(GetMeal), new { id = meal.Id }, mealDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMeal(int id, MealDto mealDto)
        {
            if (id != mealDto.Id)
            {
                return BadRequest();
            }

            var meal = await _context.Meals.FindAsync(id);
            if (meal == null)
            {
                return NotFound();
            }

            meal.Name = mealDto.Name;
            meal.Description = mealDto.Description;
            meal.Price = mealDto.Price;
            meal.ImageUrl = mealDto.ImageUrl;
            meal.CategoryId = mealDto.CategoryId;
            meal.Calories = mealDto.Calories;
            meal.Protein = mealDto.Protein;
            meal.Carbs = mealDto.Carbs;
            meal.Fats = mealDto.Fats;
            meal.Ingredients = mealDto.Ingredients;
            meal.IsSpecial = mealDto.IsSpecial;
            meal.Rating = mealDto.Rating;
            meal.PreparationTime = mealDto.PreparationTime;

            _context.Entry(meal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MealExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeal(int id)
        {
            var meal = await _context.Meals.FindAsync(id);
            if (meal == null)
            {
                return NotFound();
            }

            _context.Meals.Remove(meal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MealExists(int id)
        {
            return _context.Meals.AnyAsync(e => e.Id == id).Result;
        }
    }
}
