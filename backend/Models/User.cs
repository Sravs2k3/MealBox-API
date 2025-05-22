using System.ComponentModel.DataAnnotations;

namespace MealBox.API.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [MaxLength(100)]
        public string FullName { get; set; } = string.Empty;

        // Additional fields like Role, Address, Phone etc. can be added here
    }
}
