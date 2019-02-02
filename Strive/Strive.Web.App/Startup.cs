using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Strive.Communication.Emails;
using Strive.Web.App.Models;
using Strive.Web.Common.Providers;
using Microsoft.AspNetCore.SpaServices.Webpack;

namespace Strive.Web.App
{
    public class Startup
    {
        public Startup(IConfiguration pconfig)
        {
            this.Configuration = pconfig;
        }

        public IConfiguration Configuration { get; private set; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Добавление локализации приложения
            services.AddLocalization(StartupActionProvider.SetupLocalizationAction);

            // Добавление параметров локализации
            services.Configure<RequestLocalizationOptions>(StartupActionProvider.ConfigureRequestLocalizationOptionsAction);

            // Добавление аутентификации на основе кук
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(StartupActionProvider.ConfigureCookieAuthenticationOptionsAction);

            // Добавление дополнительных настроек маршрутизации
            services.AddRouting(StartupActionProvider.ConfigureRoutingOptionsAction);

            // Добавление контекста данных для работы с БД
            services.AddDbContext<StriveDbContext>(options =>
                options.UseSqlServer(
                    this.Configuration.GetConnectionString("DefaultConnection")));

            // Добавление Identity
            services.AddIdentity<User, IdentityRole>(StartupActionProvider.SetupIdentityOptionsAction)
                .AddEntityFrameworkStores<StriveDbContext>()
                .AddDefaultTokenProviders();

            // Настройки параметров аутентификации на основе кук для Identity
            services.ConfigureApplicationCookie(StartupActionProvider.ConfigureCookieAuthenticationOptionsAction);

            // Подключение IOptions для передачи конфигурации JSON в виде объектов C#
            services.AddOptions();
            services.Configure<EmailConfig>(Configuration.GetSection("EmailConfig"));

            // Добавление MVC
            services.AddMvc()
                .AddViewLocalization()
                .AddDataAnnotationsLocalization();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                // Подключение компонента для Webpack, чтобы при обновлении файла
                // происходило перестроение с помощью webpack
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }

            // Подключение файлов по умолчанию
            app.UseDefaultFiles();

            // Подключение статических файлов (для <link> и <script>)
            app.UseStaticFiles();

            // Настройка параметров локализации, которые потом могут быть использованы в приложении
            app.UseRequestLocalization(app.ApplicationServices
                .GetService<IOptions<RequestLocalizationOptions>>().Value);

            // Подключение аутентификации
            app.UseAuthentication();

            // Подключение MVC
            app.UseMvc(StartupActionProvider.ConfigureRoutesAction);
        }
    }
}
