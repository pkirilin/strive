using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Localization;

namespace Strive.Web.Common.Providers
{
    /// <summary>
    /// Методы действий для настройки приложения, использующиеся в классе Startup
    /// </summary>
    public static class StartupActionProvider
    {
        /// <summary>
        /// Действие настройки маршрутизации приложения
        /// </summary>
        public static void ConfigureRoutesAction(IRouteBuilder prouteBuilder)
        {
            prouteBuilder.MapRoute("default", "{controller=home}/{action=index}/{id?}");
        }

        /// <summary>
        /// Действие настройки локализации приложения
        /// </summary>
        public static void SetupLocalizationAction(LocalizationOptions poptions)
        {
            poptions.ResourcesPath = "Resources";
        }

        /// <summary>
        /// Действие настройки параметров локализации, которые можно будет в дальнейшем получать в приложении
        /// </summary>
        public static void ConfigureRequestLocalizationOptionsAction(RequestLocalizationOptions poptions)
        {
            // Культуры, поддерживаемые в приложении
            var supportedCultures = new List<CultureInfo>()
            {
                new CultureInfo("en"),
                new CultureInfo("ru")
            };

            poptions.DefaultRequestCulture = new RequestCulture("en");
            poptions.SupportedCultures = supportedCultures;
            poptions.SupportedUICultures = supportedCultures;
        }

        /// <summary>
        /// Действие настройки параметров аутентификации на основе кук
        /// </summary>
        public static void ConfigureCookieAuthenticationOptionsAction(CookieAuthenticationOptions pcookieAuthenticationOptions)
        {
            pcookieAuthenticationOptions.LoginPath = new PathString("/Account/Login");
        }
    }
}
