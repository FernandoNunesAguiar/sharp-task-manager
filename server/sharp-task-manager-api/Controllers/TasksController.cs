using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System;

namespace sharp_task_manager_api.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        [HttpGet("{accountId}")]
        public IActionResult GetTasks(int accountId)
        {
            string task_name = "";
            try
            {
                string connection = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
                using var conn = new NpgsqlConnection(connection);
                conn.Open();
                string query = "SELECT task_name from tasks where user_id = @AccountId";

                using var cmd = new NpgsqlCommand(query, conn);
                cmd.Parameters.AddWithValue("AccountId", accountId);
                using var reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                  task_name = reader.GetString(0);
                    conn.Close();
                    return Ok(new { message = "Get tasks for account " + accountId, task_name = task_name });


                }
                else
                {
                    conn.Close();
                    return NotFound(new { message = "Task not found" });

                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }
    }
 }