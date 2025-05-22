using Microsoft.AspNetCore.Mvc;

namespace MealBox.API.Controllers
{
    [ApiController]
    [Route("/")]
    public class DefaultController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "Welcome to the MealBox API!" });
        }
    }
}
