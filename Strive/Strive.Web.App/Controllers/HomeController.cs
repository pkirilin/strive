using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace Strive.Web.App.Controllers
{
    /// <summary>
    /// Главный контроллер приложения
    /// </summary>
    public class HomeController : Controller
    {
        private readonly IStringLocalizer<HomeController> _localizer;

        public HomeController(IStringLocalizer<HomeController> plocalizer)
        {
            _localizer = plocalizer;
        }

        /// <summary>
        /// Вызов представления главной страницы приложения
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public IActionResult Index()
        {
            ViewData["TitleSecondary"] = _localizer["TitleSecondary"];
            return View();
        }

        /// <summary>
        /// Действие, отвечающее за установку текущего языка приложения в cookie
        /// </summary>
        [HttpPost]
        public IActionResult SetLanguage(string culture, string returnUrl)
        {
            Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
                new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
            );

            return LocalRedirect(returnUrl);
        }
    }
}
