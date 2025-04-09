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
            int task_id = 0;
            try
            {
                string connection = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
                using var conn = new NpgsqlConnection(connection);
                conn.Open();
                string query = "SELECT id, task_name from tasks where user_id = @AccountId";

                using var cmd = new NpgsqlCommand(query, conn);
                cmd.Parameters.AddWithValue("AccountId", accountId);
                using var reader = cmd.ExecuteReader();
                var tasks = new List<object>();
                while (reader.Read())
                {
                    task_id = reader.GetInt32(0);
                    task_name = reader.GetString(1);

                    tasks.Add(new { id = task_id, task_name = task_name });
                }
                conn.Close();
                if (tasks.Count > 0) 
                {
                  
                    return Ok(new { message = "Get tasks for account " + accountId, tasks = tasks });


                }
                else
                {
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