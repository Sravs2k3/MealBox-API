using System;

namespace MealBox.API.DTOs
{
    public class MealDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public int Calories { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbs { get; set; }
        public decimal Fats { get; set; }
        public string Ingredients { get; set; } = string.Empty;
        public bool IsSpecial { get; set; }
        public decimal Rating { get; set; }
        public int PreparationTime { get; set; }
    }
}
