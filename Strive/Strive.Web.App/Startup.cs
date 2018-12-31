using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace Strive.Web.App
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
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

            app.UseMvc(ConfigureRoutesAction);
        }

        private void ConfigureRoutesAction(IRouteBuilder prouteBuilder)
        {
            prouteBuilder.MapRoute("default", "{controller=account}/{action=login}");
        }
    }
}
