using System;
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
	[Route("home")]
	public class HomeController : StriveController
	{
		protected readonly IStringLocalizer<HomeController> _localizer;

		public HomeController(
			StriveDbContext pdb,
			IStringLocalizer<SharedResources> psharedLocalizer,
			IStringLocalizer<HomeController> plocalizer) : base(pdb, psharedLocalizer)
		{
			_localizer = plocalizer;
		}

		/// <summary>
		/// Вызов представления главной страницы приложения
		/// </summary>
		/// <returns></returns>
		[Authorize]
		[HttpGet]
		[Route("/")]
		[Route("")]
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
