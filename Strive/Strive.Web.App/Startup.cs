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

// app.UseFileServer
//using System.IO;
//using Microsoft.Extensions.FileProviders;

// SetupLocalizationAction
using Microsoft.Extensions.Localization;

// ConfigureRequestLocalizationOptionsAction
using Microsoft.AspNetCore.Localization;
using System.Globalization;

// UseRequestLocalization
using Microsoft.Extensions.Options;

namespace Strive.Web.App
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLocalization(SetupLocalizationAction);

            services.Configure<RequestLocalizationOptions>(ConfigureRequestLocalizationOptionsAction);

            services.AddMvc()
                .AddViewLocalization()
                .AddDataAnnotationsLocalization();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            #region Files

            // Подключение файлов по умолчанию
            app.UseDefaultFiles();

            // Подключение статических файлов (для <link> и <script>)
            app.UseStaticFiles();

            // Поддержка каталога node_modules для npm
            //app.UseFileServer(new FileServerOptions()
            //{
            //    FileProvider = new PhysicalFileProvider(
            //        Path.Combine(env.ContentRootPath, "node_modules")
            //    ),
            //    RequestPath = "/node_modules",
            //    EnableDirectoryBrowsing = false
            //});

            #endregion

            #region RequestLocalization

            app.UseRequestLocalization(app.ApplicationServices
                .GetService<IOptions<RequestLocalizationOptions>>().Value);

            #endregion

            app.UseMvc(ConfigureRoutesAction);
        }

        private void ConfigureRoutesAction(IRouteBuilder prouteBuilder)
        {
            prouteBuilder.MapRoute("default", "{controller=home}/{action=index}/{id?}");
        }

        private void SetupLocalizationAction(LocalizationOptions poptions)
        {
            poptions.ResourcesPath = "Resourses";
        }

        private void ConfigureRequestLocalizationOptionsAction(RequestLocalizationOptions poptions)
        {
            var supportedCultures = new List<CultureInfo>()
            {
                new CultureInfo("en"),
                new CultureInfo("ru")
            };

            poptions.DefaultRequestCulture = new RequestCulture("en");
            poptions.SupportedCultures = supportedCultures;
            poptions.SupportedUICultures = supportedCultures;
        }
    }
}
