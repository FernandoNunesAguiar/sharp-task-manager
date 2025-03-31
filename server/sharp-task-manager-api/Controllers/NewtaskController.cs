using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System;

namespace sharp_task_manager_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewtaskController : ControllerBase
    {
        [HttpPost]
        public IActionResult Signup([FromBody] NewTaskRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid Request");
            }

            try
            {
                string connection = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
                if (string.IsNullOrEmpty(connection))
                {
                    System.Diagnostics.Debug.WriteLine("Database connection string is not configured");
                    return StatusCode(500, new { message = "Database connection string is not configured" });
                }

                using var conn = new NpgsqlConnection(connection);
                conn.Open();
                string query = "INSERT INTO tasks (task_name, task_description, user_id) VALUES (@taskName, @taskDescription, @user_Id)";
                using var cmd = new NpgsqlCommand(query, conn);
                cmd.Parameters.AddWithValue("taskName", request.taskName);
                cmd.Parameters.AddWithValue("taskDescription", request.taskDescription);
                cmd.Parameters.AddWithValue("user_Id", request.user_Id);
                cmd.ExecuteNonQuery();
                conn.Close();
                System.Diagnostics.Debug.WriteLine("New task created successfully");
                return Ok(new { message = "New task created successfully" });
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Failed to create new task: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }
    }

    public class NewTaskRequest
    {
        public string taskName { get; set; }
        public string taskDescription { get; set; }
        public int user_Id { get; set; }
    }
}
