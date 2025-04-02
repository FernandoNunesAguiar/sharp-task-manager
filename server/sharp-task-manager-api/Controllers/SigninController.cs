using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System;
using DotNetEnv;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace sharp_task_manager_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SigninController : ControllerBase
    {
        [HttpPost]
        public IActionResult Signin([FromBody] SigninRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid Request");
            }

            try
            {
                string connection = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
                using var conn = new NpgsqlConnection(connection);
                conn.Open();
                string query = "SELECT id, email, password FROM users WHERE email = @Email";

                using var cmd = new NpgsqlCommand(query, conn);
                cmd.Parameters.AddWithValue("Email", request.Email);
                using var reader = cmd.ExecuteReader();
                
                if (reader.Read())
                {
                    int userId = reader.GetInt32(0);
                    string email = reader.GetString(1);
                    string hashedPassword = reader.GetString(2);
                    if (BCrypt.Net.BCrypt.Verify(request.Password, hashedPassword))
                    {
                        conn.Close();
                        var cookie = new CookieOptions
                        {
                            HttpOnly = true,
                            SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict,
                            Secure = true,
                            Expires = DateTime.UtcNow.AddHours(3)
                        };
                        var jwtToken = GenerateJwtToken(request.Email);
                        Response.Cookies.Append("AutToken", jwtToken, cookie);
                        return Ok(new { message = "Signed in successfully", email = email, userId = userId } );
                    }
                    else
                    {
                        conn.Close();
                        System.Diagnostics.Debug.WriteLine("Invalid password");
                        return Unauthorized(new { message = "Invalid password" });
                    }
                }
                else
                {
                    conn.Close();
                    System.Diagnostics.Debug.WriteLine("User not found");
                    return NotFound(new { message = "User not found" });
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Failed to sign in: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        private string GenerateJwtToken(string email)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secret = Environment.GetEnvironmentVariable("JWT_SECRET");
            if (string.IsNullOrEmpty(secret))
            {
                System.Diagnostics.Debug.WriteLine("JWT secret is not configured");
                throw new InvalidOperationException("JWT secret is not configured");
            }

            var key = Encoding.UTF8.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, email)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

    public class SigninRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

