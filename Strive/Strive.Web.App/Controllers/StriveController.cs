using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace Strive.Web.App.Controllers
{
	/// <summary>
	/// Базовый контроллер для всех контроллеров приложения
	/// </summary>
	public class StriveController : Controller
	{
		protected readonly StriveDbContext _db;

		protected readonly IStringLocalizer<AccountController> _localizer;

		public StriveController(StriveDbContext pdb,
			IStringLocalizer<AccountController> plocalizer)
		{
			_db = pdb;
			_localizer = plocalizer;
		}

		/// <summary>
		/// Проверка является ли ссылка ссылкой, относящейся к приложению 
		/// </summary>
		protected bool IsUrlExistsInApplication(string purl)
		{
			return !String.IsNullOrEmpty(purl) && Url.IsLocalUrl(purl);
		}

		/// <summary>
		/// Инициализация контейнера ViewData для страниц ошибок NotFound
		/// </summary>
		protected void InitNotFoundErrorViewData()
		{
			ViewData["TitleSecondary"] = _localizer["TitleSecondary-PageNotFound"];
		}

		/// <summary>
		/// Метод, возвращающий ошибку для страницы, которая не может быть найдена или обработана
		/// </summary>
		protected IActionResult GetNotFoundError()
		{
			InitNotFoundErrorViewData();
			return View("~/Views/Shared/PageNotFound.cshtml");
		}
	}
}
