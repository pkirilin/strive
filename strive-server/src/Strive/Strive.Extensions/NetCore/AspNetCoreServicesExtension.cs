using Microsoft.Extensions.DependencyInjection;
using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Data.Services.Classes;
using Strive.Data.Services.Interfaces;

namespace Strive.Extensions.NetCore
{
    /// <summary>
    /// Provides extension methods for ASP.NET Core built-in DI
    /// </summary>
    public static class AspNetCoreServicesExtension
    {
        /// <summary>
        /// Registers application services
        /// </summary>
        public static void AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ITaskService, TaskService>();
        }

        /// <summary>
        /// Registers application repositories
        /// </summary>
        public static void AddAppRepositories(this IServiceCollection services)
        {
            services.AddScoped<IRepository<User>, StriveRepository<User>>();
            services.AddScoped<IRepository<Project>, StriveRepository<Project>>();
            services.AddScoped<IRepository<Task>, StriveRepository<Task>>();
            services.AddScoped<IRepository<TaskStatus>, StriveRepository<TaskStatus>>();
        }
    }
}