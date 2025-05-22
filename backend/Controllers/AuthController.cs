using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MealBox.API.Data;
using MealBox.API.Models;
using MealBox.API.Services;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MealBox.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtService _jwtService;
        private readonly MealBox.API.Services.PasswordResetService _passwordResetService;

        public AuthController(ApplicationDbContext context, JwtService jwtService, MealBox.API.Services.PasswordResetService passwordResetService)
        {
            _context = context;
            _jwtService = jwtService;
            _passwordResetService = passwordResetService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password) || string.IsNullOrWhiteSpace(dto.FullName))
            {
                return BadRequest(new { message = "Email, password, and full name are required." });
            }

            try
            {
                if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                {
                    return BadRequest(new { message = "Email already registered" });
                }

                var user = new User
                {
                    Email = dto.Email.Trim(),
                    PasswordHash = HashPassword(dto.Password),
                    FullName = dto.FullName.Trim()
                };

                _context.Users.Add(user);
                var result = await _context.SaveChangesAsync();

                if (result <= 0)
                {
                    return StatusCode(500, new { message = "Failed to save user. Please try again." });
                }

                var token = _jwtService.GenerateToken(user);

                return Ok(new { token });
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Registration error: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred during registration. Please try again later." });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
            {
                return BadRequest(new { message = "Email and password are required." });
            }

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == dto.Email.Trim());
            if (user == null)
            {
                Console.Error.WriteLine($"Login failed: User with email {dto.Email} not found.");
                return Unauthorized(new { message = "Invalid email or password" });
            }

            var inputPasswordHash = HashPassword(dto.Password);
            Console.Error.WriteLine($"Login attempt for {dto.Email}: input hash = {inputPasswordHash}, stored hash = {user.PasswordHash}");

            if (!VerifyPassword(dto.Password, user.PasswordHash))
            {
                Console.Error.WriteLine($"Login failed: Password mismatch for user {dto.Email}.");
                return Unauthorized(new { message = "Invalid email or password" });
            }

            var token = _jwtService.GenerateToken(user);

            return Ok(new { token });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
        {
            var success = await _passwordResetService.UpdatePasswordAsync(dto.Email, dto.NewPassword);
            if (!success)
            {
                return BadRequest(new { message = "Email not found or update failed" });
            }
            return Ok(new { message = "Password updated successfully" });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            var success = await _passwordResetService.ResetPasswordAsync(dto.Token, dto.NewPassword);
            if (!success)
            {
                return BadRequest(new { message = "Invalid or expired token" });
            }
            return Ok(new { message = "Password has been reset successfully" });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> Profile()
        {
            try
            {
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
                if (userIdClaim == null)
                {
                    return Unauthorized(new { message = "User ID claim not found" });
                }

                if (!int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized(new { message = "Invalid user ID claim" });
                }

                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                return Ok(new
                {
                    user.Id,
                    user.Email,
                    user.FullName
                });
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Profile error: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while retrieving profile" });
            }
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            var hashOfInput = HashPassword(password);
            return hashOfInput == storedHash;
        }
    }

    public class UserRegisterDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
    }

    public class UserLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class ForgotPasswordDto
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
    }

    public class ResetPasswordDto
    {
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
