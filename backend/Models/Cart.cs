using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MealBox.API.Models
{
    public class Cart
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required]
        public int MealId { get; set; }
        public Meal? Meal { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
