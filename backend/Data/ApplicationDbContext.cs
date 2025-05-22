using Microsoft.EntityFrameworkCore;
using MealBox.API.Models;

namespace MealBox.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Meal> Meals { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Cart> Carts { get; set; } = null!;
        public DbSet<Wishlist> Wishlists { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderItem> OrderItems { get; set; } = null!;
        public DbSet<Coupon> Coupons { get; set; } = null!;
        public DbSet<PasswordResetToken> PasswordResetTokens { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.PasswordHash).IsRequired();
            });

            // Configure Meal entity
            modelBuilder.Entity<Meal>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Price).HasColumnType("decimal(10,2)");
                entity.HasOne(e => e.Category)
                      .WithMany(c => c.Meals)
                      .HasForeignKey(e => e.CategoryId)
                      .OnDelete(DeleteBehavior.Cascade); // Cascade delete meals when category is deleted
            });

            // Configure Category entity
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
            });

            // Configure Cart entity
            modelBuilder.Entity<Cart>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(c => c.User)
                      .WithMany()
                      .HasForeignKey(c => c.UserId);
                entity.HasOne(c => c.Meal)
                      .WithMany()
                      .HasForeignKey(c => c.MealId);
                entity.Property(c => c.Quantity).IsRequired();
            });

            // Configure Wishlist entity
            modelBuilder.Entity<Wishlist>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(w => w.User)
                      .WithMany()
                      .HasForeignKey(w => w.UserId);
                entity.HasOne(w => w.Meal)
                      .WithMany()
                      .HasForeignKey(w => w.MealId);
            });

            // Configure Order entity
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(o => o.User)
                      .WithMany()
                      .HasForeignKey(o => o.UserId);
                entity.Property(o => o.OrderDate).IsRequired();
                entity.Property(o => o.TotalAmount).HasColumnType("decimal(10,2)");
            });

            // Configure OrderItem entity
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(oi => oi.Order)
                      .WithMany(o => o.OrderItems)
                      .HasForeignKey(oi => oi.OrderId);
                entity.HasOne(oi => oi.Meal)
                      .WithMany()
                      .HasForeignKey(oi => oi.MealId);
                entity.Property(oi => oi.Quantity).IsRequired();
                entity.Property(oi => oi.Price).HasColumnType("decimal(10,2)");
            });

            // Configure Coupon entity
            modelBuilder.Entity<Coupon>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Code).IsRequired();
                entity.Property(e => e.DiscountAmount).HasColumnType("decimal(10,2)");
                entity.Property(e => e.DiscountPercentage).HasColumnType("decimal(5,2)");
                entity.Property(e => e.ValidFrom).IsRequired();
                entity.Property(e => e.ValidTo).IsRequired();
                entity.Property(e => e.IsActive).IsRequired();
            });

            // Configure PasswordResetToken entity
            modelBuilder.Entity<PasswordResetToken>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Token).IsRequired();
                entity.Property(e => e.ExpiryDate).IsRequired();
                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId);
            });
        }
    }
}
