using Microsoft.Extensions.DependencyInjection;
using Strive.Data.Repositories.Classes;
using Strive.Data.Repositories.Interfaces;
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
        }

        /// <summary>
        /// Registers application repositories
        /// </summary>
        public static void AddAppRepositories(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
        }
    }
}
