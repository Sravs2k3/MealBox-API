using System.ComponentModel.DataAnnotations;

namespace MealBox.API.Models
{
    public class Wishlist
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required]
        public int MealId { get; set; }
        public Meal? Meal { get; set; }
    }
}
