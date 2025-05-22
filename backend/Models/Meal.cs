using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MealBox.API.Models
{
    /// <summary>
    /// Represents a meal item with details and nutritional information.
    /// </summary>
    public class Meal
    {
        public Meal()
        {
            Name = string.Empty;
            Description = string.Empty;
            ImageUrl = string.Empty;
            Ingredients = string.Empty;
        }

        /// <summary>
        /// Gets or sets the unique identifier for the meal.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the name of the meal.
        /// </summary>
        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the description of the meal.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets the price of the meal.
        /// </summary>
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        /// <summary>
        /// Gets or sets the cost price of the meal.
        /// </summary>
        [Column(TypeName = "decimal(10,2)")]
        public decimal CostPrice { get; set; }

        /// <summary>
        /// Gets or sets the image URL of the meal.
        /// </summary>
        public string ImageUrl { get; set; }

        /// <summary>
        /// Gets or sets the category ID to which the meal belongs.
        /// </summary>
        public int CategoryId { get; set; }

        /// <summary>
        /// Gets or sets the category of the meal.
        /// </summary>
        public Category? Category { get; set; }

        // Nutritional Information

        /// <summary>
        /// Gets or sets the calories in the meal.
        /// </summary>
        [Range(0, int.MaxValue)]
        public int Calories { get; set; }

        /// <summary>
        /// Gets or sets the protein content in grams.
        /// </summary>
        [Range(0, double.MaxValue)]
        public decimal Protein { get; set; } // in grams

        /// <summary>
        /// Gets or sets the carbohydrate content in grams.
        /// </summary>
        [Range(0, double.MaxValue)]
        public decimal Carbs { get; set; } // in grams

        /// <summary>
        /// Gets or sets the fat content in grams.
        /// </summary>
        [Range(0, double.MaxValue)]
        public decimal Fats { get; set; } // in grams

        // Ingredients

        /// <summary>
        /// Gets or sets the ingredients as a JSON string.
        /// </summary>
        public string Ingredients { get; set; } // JSON string of ingredients and quantities

        // Additional fields

        /// <summary>
        /// Gets or sets a value indicating whether the meal is special.
        /// </summary>
        public bool IsSpecial { get; set; }

        /// <summary>
        /// Gets or sets the rating of the meal.
        /// </summary>
        [Range(0, 5)]
        public decimal Rating { get; set; }

        /// <summary>
        /// Gets or sets the preparation time in minutes.
        /// </summary>
        [Range(0, int.MaxValue)]
        public int PreparationTime { get; set; } // in minutes
    }
}
