using System;
using System.Linq;
using System.Threading.Tasks;
using MealBox.API.Data;
using MealBox.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace MealBox.API.Services
{
    public class PasswordResetService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<PasswordResetService> _logger;

        public PasswordResetService(ApplicationDbContext context, IConfiguration configuration, ILogger<PasswordResetService> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<bool> UpdatePasswordAsync(string email, string newPassword)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                _logger.LogWarning($"Password update requested for non-existent email: {email}");
                return false;
            }

            user.PasswordHash = HashPassword(newPassword);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ResetPasswordAsync(string token, string newPassword)
        {
            var resetToken = await _context.PasswordResetTokens
                .Include(t => t.User)
                .SingleOrDefaultAsync(t => t.Token == token);

            if (resetToken == null || resetToken.ExpiryDate < DateTime.UtcNow)
            {
                return false;
            }

            // Update password
            resetToken.User.PasswordHash = HashPassword(newPassword);

            // Remove token after use
            _context.PasswordResetTokens.Remove(resetToken);

            await _context.SaveChangesAsync();

            return true;
        }

        private string HashPassword(string password)
        {
            using var sha256 = System.Security.Cryptography.SHA256.Create();
            var bytes = System.Text.Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}
