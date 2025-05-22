using System;
using System.ComponentModel.DataAnnotations;

namespace MealBox.API.Models
{
    public class Coupon
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Code { get; set; }

        public decimal DiscountAmount { get; set; }

        public decimal DiscountPercentage { get; set; }

        public DateTime ValidFrom { get; set; }

        public DateTime ValidTo { get; set; }

        public bool IsActive { get; set; }
    }
}
