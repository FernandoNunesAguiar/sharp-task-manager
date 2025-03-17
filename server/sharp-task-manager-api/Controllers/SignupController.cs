using Microsoft.AspNetCore.Mvc;
using Npgsql;



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

            // Connection with Neon's PostgreSQL database using Npgsql

            try
            {
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password); // Bcrypting the password
                string connection = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
                using var conn = new NpgsqlConnection(connection);
                conn.Open();
                string query = "INSERT INTO users (email, password) VALUES (@Email, @Password)";
                using var cmd = new NpgsqlCommand(query, conn);
                cmd.Parameters.AddWithValue("Email", request.Email);
                cmd.Parameters.AddWithValue("Password", hashedPassword);
                cmd.ExecuteNonQuery();
                conn.Close();
                System.Diagnostics.Debug.WriteLine("Signed up successfully");
                return Ok(new { message = "Signed up successfully" });
            }
            catch
            {
                System.Diagnostics.Debug.WriteLine("Failed to sign up");
                return StatusCode(500, new { message = "Internal server error" });
                }
        }
    }

    public class SignupRequest
    {
        public string Email { get; set; }      
        public string Password { get; set; }
    }
}