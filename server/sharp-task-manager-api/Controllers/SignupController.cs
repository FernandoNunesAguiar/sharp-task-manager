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
            
            try {
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password); // Bcrypting the password
                string connection = "Host=ep-white-wave-a82m5tlx-pooler.eastus2.azure.neon.tech;Database=task-database;Username=task-database_owner;Password=npg_VZhJyeoBH78g";       
                using var conn = new NpgsqlConnection(connection);
                conn.Open();
                string query = "INSERT INTO users (email, password) VALUES (@Email, @Password)";
                using var cmd = new NpgsqlCommand(query, conn);
                cmd.Parameters.AddWithValue("Email", request.Email);
                cmd.Parameters.AddWithValue("Password", hashedPassword);
                cmd.ExecuteNonQuery();
                conn.Close();
                System.Diagnostics.Debug.WriteLine("Signed up successfully");
                return Ok("Signed up successfully");
                }
                catch
                {
                    System.Diagnostics.Debug.WriteLine("Failed to sign up");
                    return StatusCode(500, "Internal server error");
                }
        }
    }

    public class SignupRequest
    {
        public string Email { get; set; }      
        public string Password { get; set; }
    }
}