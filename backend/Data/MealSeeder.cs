using System.Collections.Generic;
using System.Threading.Tasks;
using MealBox.API.Models;
using System.Linq;

namespace MealBox.API.Data
{
    public static class MealSeeder
    {
        private static int GetCategoryId(List<Category> categories, string categoryString)
        {
            if (categoryString.Contains("Breakfast"))
                return categories.FirstOrDefault(c => c.Name == "Breakfast")?.Id ?? 0;
            if (categoryString.Contains("Non-Veg"))
                return categories.FirstOrDefault(c => c.Name == "Non-Veg")?.Id ?? 0;
            if (categoryString.Contains("Dessert"))
                return categories.FirstOrDefault(c => c.Name == "Desserts")?.Id ?? 0;
            if (categoryString.Contains("Snack"))
                return categories.FirstOrDefault(c => c.Name == "Snacks")?.Id ?? 0;
            if (categoryString.Contains("Special"))
                return categories.FirstOrDefault(c => c.Name == "Special")?.Id ?? 0;
            if (categoryString.Contains("Veg"))
                return categories.FirstOrDefault(c => c.Name == "Veg")?.Id ?? 0;
            // Fallback to Veg category if no match found to avoid foreign key errors
            var vegCategory = categories.FirstOrDefault(c => c.Name == "Veg");
            if (vegCategory != null)
                return vegCategory.Id;
            return 0;
        }

        public static async Task SeedMeals(ApplicationDbContext context)
        {
            var categories = context.Categories.ToList();

            if (categories == null || categories.Count == 0)
            {
                throw new System.Exception("No categories found in database. Please seed categories before seeding meals.");
            }

            // Optional: Clear existing meals to avoid conflicts
            var existingMeals = context.Meals.ToList();
            if (existingMeals.Count > 0)
            {
                context.Meals.RemoveRange(existingMeals);
                await context.SaveChangesAsync();
            }

            var meals = new List<Meal>
            {
                new Meal { Id = 1, Name = "Idli (2 pcs)", Description = "Soft steamed rice cakes, served with chutney and sambar.", Price = 40m, CostPrice = 20m, ImageUrl = "assets/images/idli.jpg", CategoryId = GetCategoryId(categories, "Breakfast, Veg"), Rating = 5m },
                new Meal { Id = 2, Name = "Medu Vada (2 pcs)", Description = "Crispy fried lentil doughnuts, served with chutney and sambar.", Price = 50m, CostPrice = 25m, ImageUrl = "assets/images/medu-vada.jpg", CategoryId = GetCategoryId(categories, "Breakfast, Veg"), Rating = 5m },
                new Meal { Id = 3, Name = "Masala Dosa", Description = "Crispy rice crepe filled with spiced potato masala.", Price = 70m, CostPrice = 35m, ImageUrl = "assets/images/masala-dosa.jpg", CategoryId = GetCategoryId(categories, "Breakfast, Veg"), Rating = 5m },
                new Meal { Id = 4, Name = "Plain Dosa", Description = "Thin crispy rice crepe served with chutney and sambar.", Price = 60m, CostPrice = 30m, ImageUrl = "assets/images/plain-dosa.jpg", CategoryId = GetCategoryId(categories, "Breakfast, Veg"), Rating = 5m },
                new Meal { Id = 5, Name = "Upma", Description = "Savory semolina porridge with mustard seeds and curry leaves.", Price = 45m, CostPrice = 22m, ImageUrl = "assets/images/upma.jpg", CategoryId = GetCategoryId(categories, "Breakfast, Veg"), Rating = 4m },
                new Meal { Id = 6, Name = "Poori with Curry", Description = "Deep-fried wheat bread served with potato curry.", Price = 55m, CostPrice = 27m, ImageUrl = "assets/images/poori-curry.jpg", CategoryId = GetCategoryId(categories, "Breakfast, Veg"), Rating = 5m },
                new Meal { Id = 7, Name = "Pongal", Description = "Creamy rice and lentil dish flavored with black pepper and ginger.", Price = 50m, CostPrice = 25m, ImageUrl = "assets/images/pongal.jpg", CategoryId = GetCategoryId(categories, "Breakfast, Veg, Dessert"), Rating = 5m },
                new Meal { Id = 8, Name = "Veg Thali", Description = "Assorted vegetarian dishes served with rice and bread.", Price = 120m, CostPrice = 60m, ImageUrl = "assets/images/veg-thali.jpg", CategoryId = GetCategoryId(categories, "Special, Veg"), Rating = 4.8m },
                new Meal { Id = 9, Name = "South Indian Meals", Description = "Traditional South Indian meal with rice, sambar, rasam, and vegetables.", Price = 150m, CostPrice = 75m, ImageUrl = "assets/images/south-indian-meals.jpg", CategoryId = GetCategoryId(categories, "Special, Veg"), Rating = 5m },
                new Meal { Id = 10, Name = "North Indian Thali", Description = "Assorted North Indian dishes served with rice and bread.", Price = 160m, CostPrice = 80m, ImageUrl = "assets/images/north-indian-thali.jpg", CategoryId = GetCategoryId(categories, "Special, Veg"), Rating = 4.8m },
                new Meal { Id = 11, Name = "Chicken Biryani", Description = "Spiced basmati rice cooked with marinated chicken.", Price = 180m, CostPrice = 90m, ImageUrl = "assets/images/chicken-biryani.jpg", CategoryId = GetCategoryId(categories, "Special, Non-Veg"), Rating = 5m },
                new Meal { Id = 12, Name = "Mutton Biryani", Description = "Spiced basmati rice cooked with tender mutton pieces.", Price = 250m, CostPrice = 125m, ImageUrl = "assets/images/mutton-biryani.jpg", CategoryId = GetCategoryId(categories, "Special, Non-Veg"), Rating = 4.5m },
                new Meal { Id = 13, Name = "Paneer Butter Masala", Description = "Creamy tomato-based curry with paneer cubes.", Price = 130m, CostPrice = 65m, ImageUrl = "assets/images/paneer-butter-masala.jpg", CategoryId = GetCategoryId(categories, "Special, Veg"), Rating = 5m },
                new Meal { Id = 14, Name = "Butter Chicken", Description = "Rich and creamy tomato-based chicken curry.", Price = 180m, CostPrice = 90m, ImageUrl = "assets/images/butter-chicken.jpg", CategoryId = GetCategoryId(categories, "Special, Non-Veg"), Rating = 5m },
                new Meal { Id = 15, Name = "Veg Pulao", Description = "Fragrant rice cooked with vegetables and spices.", Price = 90m, CostPrice = 45m, ImageUrl = "assets/images/veg-pulao.jpg", CategoryId = GetCategoryId(categories, "Special, Veg"), Rating = 5m },
                new Meal { Id = 16, Name = "Chicken Curry", Description = "Spicy chicken curry with rich gravy.", Price = 150m, CostPrice = 75m, ImageUrl = "assets/images/chicken-curry.jpg", CategoryId = GetCategoryId(categories, "Special, Non-Veg"), Rating = 5m },
                new Meal { Id = 17, Name = "Dal Tadka", Description = "Yellow lentils tempered with spices.", Price = 100m, CostPrice = 50m, ImageUrl = "assets/images/dal-tadka.jpg", CategoryId = GetCategoryId(categories, "Special, Veg"), Rating = 4m },
                new Meal { Id = 18, Name = "Roti (1 pc)", Description = "Whole wheat flatbread.", Price = 10m, CostPrice = 5m, ImageUrl = "assets/images/roti.jpg", CategoryId = GetCategoryId(categories, "Snack, Veg"), Rating = 5m },
                new Meal { Id = 19, Name = "Naan (1 pc)", Description = "Leavened oven-baked flatbread.", Price = 20m, CostPrice = 10m, ImageUrl = "assets/images/naan.jpg", CategoryId = GetCategoryId(categories, "Snack, Veg"), Rating = 5m },
                new Meal { Id = 20, Name = "Jeera Rice", Description = "Basmati rice flavored with cumin seeds.", Price = 80m, CostPrice = 40m, ImageUrl = "assets/images/jeera-rice.jpg", CategoryId = GetCategoryId(categories, "Special, Veg"), Rating = 4m },
                new Meal { Id = 21, Name = "Samosa (2 pcs)", Description = "Deep-fried pastry filled with spiced potatoes.", Price = 30m, CostPrice = 15m, ImageUrl = "assets/images/samosa.jpg", CategoryId = GetCategoryId(categories, "Snack, Veg"), Rating = 4.9m },
                new Meal { Id = 22, Name = "Paneer Tikka", Description = "Grilled paneer cubes marinated in spices.", Price = 120m, CostPrice = 60m, ImageUrl = "assets/images/paneer-tikka.jpg", CategoryId = GetCategoryId(categories, "Snack, Veg"), Rating = 5m },
                new Meal { Id = 23, Name = "Chicken 65", Description = "Spicy deep-fried chicken bites.", Price = 130m, CostPrice = 65m, ImageUrl = "assets/images/chicken-65.jpg", CategoryId = GetCategoryId(categories, "Snack, Non-Veg"), Rating = 5m },
                new Meal { Id = 24, Name = "Gobi Manchurian", Description = "Fried cauliflower in spicy sauce.", Price = 110m, CostPrice = 55m, ImageUrl = "assets/images/gobi-manchurian.jpg", CategoryId = GetCategoryId(categories, "Snack, Veg"), Rating = 5m },
                new Meal { Id = 25, Name = "Veg Spring Rolls", Description = "Crispy rolls filled with vegetables.", Price = 100m, CostPrice = 50m, ImageUrl = "assets/images/veg-spring-rolls.jpg", CategoryId = GetCategoryId(categories, "Snack, Veg"), Rating = 5m },
                new Meal { Id = 26, Name = "Egg Puff", Description = "Flaky pastry filled with egg.", Price = 25m, CostPrice = 12m, ImageUrl = "assets/images/egg-puff.jpg", CategoryId = GetCategoryId(categories, "Snack, Non-Veg"), Rating = 4.8m },
                new Meal { Id = 27, Name = "Chicken Pakora", Description = "Spicy fried chicken fritters.", Price = 140m, CostPrice = 70m, ImageUrl = "assets/images/chicken-pakora.jpg", CategoryId = GetCategoryId(categories, "Snack, Non-Veg"), Rating = 5m },
                new Meal { Id = 28, Name = "Aloo Tikki", Description = "Spiced potato patties.", Price = 40m, CostPrice = 20m, ImageUrl = "assets/images/aloo-tikki.jpg", CategoryId = GetCategoryId(categories, "Snack, Veg"), Rating = 5m },
                new Meal { Id = 29, Name = "Masala Chai", Description = "Spiced Indian tea with milk.", Price = 20m, CostPrice = 10m, ImageUrl = "assets/images/masala-chai.jpg", CategoryId = GetCategoryId(categories, "Snack, Veg"), Rating = 5m },
                new Meal { Id = 30, Name = "Filter Coffee", Description = "Strong South Indian coffee.", Price = 25m, CostPrice = 12m, ImageUrl = "assets/images/filter-coffee.jpg", CategoryId = GetCategoryId(categories, "Snack, Veg"), Rating = 5m },
                new Meal { Id = 31, Name = "Mango Lassi", Description = "Sweet mango yogurt drink.", Price = 50m, CostPrice = 25m, ImageUrl = "assets/images/mango-lassi.jpg", CategoryId = GetCategoryId(categories, "Dessert,Snack, Veg"), Rating = 4m },
                new Meal { Id = 32, Name = "Rose Milk", Description = "Sweet rose-flavored milk.", Price = 40m, CostPrice = 20m, ImageUrl = "assets/images/rose-milk.jpg", CategoryId = GetCategoryId(categories, "Dessert, Snack, Veg"), Rating = 5m },
                new Meal { Id = 33, Name = "Badam Milk", Description = "Almond flavored milk drink.", Price = 50m, CostPrice = 25m, ImageUrl = "assets/images/badam-milk.jpg", CategoryId = GetCategoryId(categories, "Dessert, Snack, Veg"), Rating = 4m },
                new Meal { Id = 34, Name = "Gulab Jamun (2 pcs)", Description = "Soft deep-fried sweet balls soaked in syrup.", Price = 40m, CostPrice = 20m, ImageUrl = "assets/images/gulab-jamun.jpg", CategoryId = GetCategoryId(categories, "Dessert"), Rating = 5m },
                new Meal { Id = 35, Name = "Rasgulla (2 pcs)", Description = "Soft spongy balls made from chenna.", Price = 40m, CostPrice = 20m, ImageUrl = "assets/images/rasgulla.jpg", CategoryId = GetCategoryId(categories, "Dessert"), Rating = 4.8m },
                new Meal { Id = 36, Name = "Ice Cream (Scoop)", Description = "Cold creamy ice cream scoop.", Price = 60m, CostPrice = 30m, ImageUrl = "assets/images/ice-cream.jpg", CategoryId = GetCategoryId(categories, "Dessert"), Rating = 5m },
                new Meal { Id = 37, Name = "Jalebi", Description = "Crispy and juicy orange spiral soaked in sugar syrup.", Price = 50m, CostPrice = 25m, ImageUrl = "assets/images/jalebi.jpg", CategoryId = GetCategoryId(categories, "Dessert"), Rating = 5m },
                new Meal { Id = 38, Name = "Kaju Katli", Description = "Rich cashew nut fudge made with ghee and sugar.", Price = 80m, CostPrice = 40m, ImageUrl = "assets/images/kaju-katli.jpg", CategoryId = GetCategoryId(categories, "Dessert"), Rating = 5m },
                new Meal { Id = 39, Name = "Motichoor Ladoo", Description = "Soft orange ladoos made from tiny boondi and ghee.", Price = 60m, CostPrice = 30m, ImageUrl = "assets/images/motichoor-ladoo.jpg", CategoryId = GetCategoryId(categories, "Dessert"), Rating = 4.5m },
                new Meal { Id = 40, Name = "Rasgulla Sandesh", Description = "Light and fresh Bengali dessert made with paneer.", Price = 70m, CostPrice = 35m, ImageUrl = "assets/images/sandesh.jpg", CategoryId = GetCategoryId(categories, "Dessert"), Rating = 4m },
                new Meal { Id = 41, Name = "Double Ka Meetha", Description = "Rich bread pudding soaked in saffron and dry fruits.", Price = 65m, CostPrice = 32m, ImageUrl = "assets/images/double-ka-meetha.jpg", CategoryId = GetCategoryId(categories, "Dessert"), Rating = 5m },
                new Meal { Id = 42, Name = "Basundi", Description = "Thickened sweet milk dessert flavored with cardamom.", Price = 75m, CostPrice = 37m, ImageUrl = "assets/images/basundi.jpg", CategoryId = GetCategoryId(categories, "Dessert"), Rating = 4.8m },
                new Meal { Id = 43, Name = "Malpua", Description = "Deep-fried pancakes soaked in syrup, served with rabri.", Price = 70m, CostPrice = 35m, ImageUrl = "assets/images/malpua.jpg", CategoryId = GetCategoryId(categories, "Dessert"), Rating = 5m },
                new Meal { Id = 44, Name = "Spaghetti Bolognese", Description = "Classic Italian pasta with rich meat sauce.", Price = 250m, CostPrice = 125m, ImageUrl = "assets/images/spaghetti-bolognese.jpg", CategoryId = GetCategoryId(categories, "Special, Non-Veg"), Rating = 4.5m },
                new Meal { Id = 45, Name = "Margherita Pizza", Description = "Traditional pizza with fresh tomatoes, mozzarella, and basil.", Price = 300m, CostPrice = 150m, ImageUrl = "assets/images/margherita-pizza.jpg", CategoryId = GetCategoryId(categories, "Special, Veg"), Rating = 4.7m },
                new Meal { Id = 46, Name = "Caesar Salad", Description = "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.", Price = 180m, CostPrice = 90m, ImageUrl = "assets/images/caesar-salad.jpg", CategoryId = GetCategoryId(categories, "Special, Veg"), Rating = 4.2m }
            };

            foreach (var meal in meals)
            {
                if (meal.CategoryId == 0)
                {
                    throw new System.Exception($"Invalid CategoryId 0 for meal '{meal.Name}'. Please check category mapping.");
                }

                var existingMeal = context.Meals.FirstOrDefault(m => m.Name == meal.Name);
                if (existingMeal != null)
                {
                    existingMeal.Description = meal.Description;
                    existingMeal.Price = meal.Price;
                    existingMeal.CostPrice = meal.CostPrice;
                    existingMeal.ImageUrl = meal.ImageUrl;
                    existingMeal.CategoryId = meal.CategoryId;
                    existingMeal.Rating = meal.Rating;
                }
                else
                {
                    context.Meals.Add(meal);
                }
            }

            await context.SaveChangesAsync();
        }
    }
}
