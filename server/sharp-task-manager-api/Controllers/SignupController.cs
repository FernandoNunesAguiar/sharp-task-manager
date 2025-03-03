using Microsoft.AspNetCore.Mvc;

namespace sharp_task_manager_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SignupController : ControllerBase
    {
        [HttpPost]
        public IActionResult Signup([FromBody] SignupRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid Request");
            }

            return Ok("Well done");
        }
    }

    public class SignupRequest
    {
        public string Email { get; set; }      
        public string Password { get; set; }
    }
}