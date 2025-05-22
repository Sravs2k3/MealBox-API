using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MealBox.API.Data;
using MealBox.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MealBox.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders(int userId)
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Meal)
                .Where(o => o.UserId == userId)
                .ToListAsync();

            return orders;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrders), new { userId = order.UserId }, order);
        }

        [HttpGet("details/{orderId}")]
        public async Task<ActionResult<Order>> GetOrderDetails(int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Meal)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
    }
}
