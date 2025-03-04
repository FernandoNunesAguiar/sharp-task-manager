using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using DotNetEnv;

namespace sharp_task_manager_api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Env.Load();
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}