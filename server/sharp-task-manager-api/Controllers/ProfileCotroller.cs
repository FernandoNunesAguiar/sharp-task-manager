using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System;

namespace sharp_task_manager_api.Controllers
{
    [Route("api/profile")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        [HttpGet("{accountId}")]
        public IActionResult getProfie(int accountId)
        {
            string email = "";
            int profile_id = 0;
            try
            {
                string connection = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
                using var conn = new NpgsqlConnection(connection);
                conn.Open();
                string query = "SELECT id, email from users where id = @AccountId";
                using var cmd = new NpgsqlCommand(query, conn);
                cmd.Parameters.AddWithValue("AccountId", accountId);
                using var reader = cmd.ExecuteReader();
                var profile = new List<object>();
                while (reader.Read())
                {
                    profile_id = reader.GetInt32(0);
                    email = reader.GetString(1);

                    profile.Add(new { id = profile_id, email = email });
                }
                conn.Close();
                if (profile.Count > 0)
                {

                    return Ok(new { message = "Got info from account " + accountId, profile = profile });


                }
                else
                {
                    return NotFound(new { message = "Account not found" });

                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }
    }
}