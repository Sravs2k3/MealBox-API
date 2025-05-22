using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MealBox.API.Data;
using MealBox.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace MealBox.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCartItems()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized();
            }

            var items = await _context.Carts
                .Include(c => c.Meal)
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return items;
        }

        [HttpPost]
        public async Task<ActionResult<Cart>> AddToCart(Cart cart)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized();
            }

            var existingItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == userId && c.MealId == cart.MealId);

            if (existingItem != null)
            {
                existingItem.Quantity += cart.Quantity;
                _context.Carts.Update(existingItem);
            }
            else
            {
                cart.UserId = userId;
                _context.Carts.Add(cart);
            }

            await _context.SaveChangesAsync();

            return Ok(cart);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var cartItem = await _context.Carts.FindAsync(id);
            if (cartItem == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartItemExists(int id)
        {
            return _context.Carts.AnyAsync(e => e.Id == id).Result;
        }
    }
}
