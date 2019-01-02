using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Options;

using Strive.Web.Common.Providers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

using System.Text.RegularExpressions;

namespace Strive.Web.App
{
    public class Startup
    {
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

            // Добавление MVC
            services.AddMvc()
                .AddViewLocalization()
                .AddDataAnnotationsLocalization();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
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
