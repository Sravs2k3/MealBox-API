using System.Collections.Generic;
using System.Threading.Tasks;
using MealBox.API.Models;
using MealBox.API.Data;
using System.Linq;

namespace MealBox.API.Data
{
    public static class CategorySeeder
    {
        public static async Task SeedCategories(ApplicationDbContext context)
        {
            if (context.Categories.Any())
            {
                context.Categories.RemoveRange(context.Categories);
                await context.SaveChangesAsync();
            }

            var categories = new List<Category>
            {
                new Category { Name = "Veg" },
                new Category { Name = "Non-Veg" },
                new Category { Name = "Desserts" },
                new Category { Name = "Snacks" },
                new Category { Name = "Breakfast" },
                new Category { Name = "Special" }
            };

            context.Categories.AddRange(categories);
            await context.SaveChangesAsync();
        }
    }
}
