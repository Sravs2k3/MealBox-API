using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MealBox.API.Models
{
    /// <summary>
    /// Represents a category of meals.
    /// </summary>
    public class Category
    {
        public Category()
        {
            Name = string.Empty;
            Meals = new List<Meal>();
        }

        /// <summary>
        /// Gets or sets the unique identifier for the category.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the name of the category.
        /// </summary>
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the collection of meals in this category.
        /// </summary>
        [JsonIgnore]
        public ICollection<Meal> Meals { get; set; }

        /// <summary>
        /// Returns the name of the category.
        /// </summary>
        /// <returns>The name of the category.</returns>
        public override string ToString()
        {
            return Name;
        }
    }
}
