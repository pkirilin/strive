using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Strive.Communication.Emails;
using Strive.Communication.Emails.EmailBuilders;
using Strive.Web.App.Models;
using Strive.Web.App.ViewModels.Account.ForgotPassword;
using Strive.Web.App.ViewModels.Account.Login;
using Strive.Web.App.ViewModels.Account.Register;
using Strive.Web.App.ViewModels.Account.ResetPassword;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace Strive.Web.App.Controllers
{
	public class AccountController : Controller
	{
		private readonly StriveDbContext _db;

		private readonly IStringLocalizer<AccountController> _localizer;

		private readonly UserManager<User> _userManager;

		private readonly SignInManager<User> _signInManager;

		public AccountController(StriveDbContext pdb,
			IStringLocalizer<AccountController> plocalizer,
			UserManager<User> puserManager,
			SignInManager<User> psignInManager)
		{
			_db = pdb;
			_localizer = plocalizer;
			_userManager = puserManager;
			_signInManager = psignInManager;
		}

		#region Private

		/// <summary>
		/// Инициализация контейнера ViewData для страниц, относящихся к Login
		/// </summary>
		private void InitLoginViewData()
		{
			ViewData["TitleSecondary"] = _localizer["TitleSecondary-Login"];
		}

		/// <summary>
		/// Инициализация контейнера ViewData для страниц, относящихся к Register
		/// </summary>
		private void InitRegisterViewData()
		{
			ViewData["TitleSecondary"] = _localizer["TitleSecondary-Register"];
		}

		/// <summary>
		/// Инициализация контейнера ViewData для страниц, относящихся к ForgotPassword
		/// </summary>
		private void InitForgotPasswordViewData()
		{
			ViewData["TitleSecondary"] = _localizer["TitleSecondary-ForgotPassword"];
		}

		/// <summary>
		/// Инициализация контейнера ViewData для страниц, относящихся к ResetPassword
		/// </summary>
		private void InitResetPasswordViewData()
		{
			ViewData["TitleSecondary"] = _localizer["TitleSecondary-ResetPassword"];
		}

		// @todo общая функция, вынести в отдельную dll
		/// <summary>
		/// Проверка является ли ссылка ссылкой, относящейся к приложению 
		/// </summary>
		private bool IsUrlExistsInApplication(string purl)
		{
			return !String.IsNullOrEmpty(purl) && Url.IsLocalUrl(purl);
		}

		/// <summary>
		/// Отправка пользователю email сообщения для подтверждения его регистрации
		/// </summary>
		private async void SendRegisterConfirmationMailAsync(User puser)
		{
			string confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(puser);
			string confirmationLink = Url.Action(
				"ConfirmEmail",
				"Account",
				new { puserID = puser.Id, ptoken = confirmationToken },
				protocol: HttpContext.Request.Scheme);
			var emailBuilder = new ConfirmRegistrationEmailBuilder(confirmationLink);
			var emailSender = new EmailSender(emailBuilder);
			await emailSender.SendEmailAsync(puser.Email);
		}

		/// <summary>
		/// Отправка пользователю email сообщения для сброса его пароля
		/// </summary>
		private async void SendPasswordResetMailAsync(User puser)
		{
			string passwordResetToken = await _userManager.GeneratePasswordResetTokenAsync(puser);
			string passwordResetLink = Url.Action(
				"ResetPassword",
				"Account",
				new
				{
					pemail = puser.Email,
					ptoken = passwordResetToken
				},
				protocol: HttpContext.Request.Scheme);
			var emailBuilder = new PasswordResetEmailBuilder(passwordResetLink);
			var emailSender = new EmailSender(emailBuilder);
			await emailSender.SendEmailAsync(puser.Email);
		}

		/// <summary>
		/// Попытка создать нового пользователя и получение результата
		/// </summary>
		private async Task<bool> TryCreateUserAsync(RegisterViewModel pmodel)
		{
			// Создание пустых данных для нового пользователя
			//UserDetails userDetails = new UserDetails();

			// Создание нового пользователя
			User user = new User()
			{
				UserName = pmodel.UserName,
				Email = pmodel.Email
				//,
				//Details = userDetails
			};

			// Добавление пользователя в БД и получение результата
			IdentityResult result = await _userManager.CreateAsync(user, pmodel.Password);

			// Проверка результата добавления пользователя
			if (result.Succeeded == true)
			{
				SendRegisterConfirmationMailAsync(user);
				return true;
			}
			else
			{
				// Добавление к состоянию модели всех возникших ошибок
				foreach (IdentityError error in result.Errors)
					ModelState.AddModelError(string.Empty, error.Description);
				return false;
			}
		}

		#endregion

		/// <summary>
		/// Метод действия для показа пользователю страницы входа в учетную запись
		/// </summary>
		[HttpGet]
		public IActionResult Login()
		{
			InitLoginViewData();
			return View();
		}

		/// <summary>
		/// Метод действия для осуществления входа в учетную запись
		/// </summary>
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Login(LoginViewModel pmodel)
		{
			InitLoginViewData();

			if (ModelState.IsValid == true)
			{
				// Проверка пользователя
				User user = await _userManager.FindByEmailAsync(pmodel.Email);
				if (user != null)
				{
					// Проверка, подтвержден ли email
					if (await _userManager.IsEmailConfirmedAsync(user) == false)
					{
						// @todo locale
						ModelState.AddModelError(String.Empty, "email not confirmed");
						return View(pmodel);
					}
				}

				// Попытка входа с указанными данными и получение результата
				SignInResult result = await _signInManager.PasswordSignInAsync(
					user.UserName, pmodel.Password, pmodel.RememberMe, false);

				if (result.Succeeded == true)
				{
					// Если удалось войти, идет проверка запрашиваемого Url
					if (IsUrlExistsInApplication(pmodel.ReturnUrl) == true)
						return Redirect(pmodel.ReturnUrl);
					else
						return RedirectToAction("Index", "Home");
				}
				else
				{
					// @todo locale
					ModelState.AddModelError("", "sign in error: incorrect data");
				}
			}
			return View(pmodel);
		}

		/// <summary>
		/// Метод действия для показа пользователю страницы регистрации учетной записи
		/// </summary>
		[HttpGet]
		public IActionResult Register()
		{
			InitRegisterViewData();

			// debug
			User u = _db.Users.FirstOrDefault();
			if (u != null)
			{
				_db.Users.Remove(u);
				_db.SaveChanges();
			}

			return View();
		}

		/// <summary>
		/// Метод действия для осуществления регистрации учетной записи
		/// </summary>
		[HttpPost]
		public async Task<IActionResult> Register(RegisterViewModel pmodel)
		{
			InitRegisterViewData();

			if (ModelState.IsValid == true)
			{
				bool isUserCreated = await TryCreateUserAsync(pmodel);
				if (isUserCreated == true)
					return RedirectToAction("Index", "Home");
			}
			// @todo redirect на страницу с информацией о том, что был выслан Email
			return View(pmodel);
		}

		/// <summary>
		/// Метод действия для подтверждения адреса эл. почты при регистрации
		/// </summary>
		/// <param name="puserID">ID пользователя</param>
		/// <param name="ptoken">Сгенерированный для пользователя код подтверждения</param>
		[HttpGet]
		[AllowAnonymous]
		public async Task<IActionResult> ConfirmEmail(string puserID, string ptoken)
		{
			if (puserID == null || ptoken == null)
				return NotFound();  // @todo exception page

			User user = await _userManager.FindByIdAsync(puserID);
			if (user == null)
				return NotFound();  // @todo exception page

			IdentityResult result = await _userManager.ConfirmEmailAsync(user, ptoken);
			if (result.Succeeded == true)
				return RedirectToAction("Index", "Home");
			else
				return NotFound();  // @todo exception page 
		}

		/// <summary>
		/// Метод действия для выхода из учетной записи
		/// </summary>
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Logout()
		{
			await _signInManager.SignOutAsync();
			return RedirectToAction("Index", "Home");
		}

		/// <summary>
		/// Метод действия для показа пользователю страницы запроса на сброс пароля
		/// </summary>
		[HttpGet]
		[AllowAnonymous]
		public IActionResult ForgotPassword()
		{
			InitForgotPasswordViewData();
			return View();
		}

		/// <summary>
		/// Метод действия для обработки запроса на сброс пароля
		/// </summary>
		[HttpPost]
		[AllowAnonymous]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel pmodel)
		{
			InitForgotPasswordViewData();

			if (ModelState.IsValid == true)
			{
				// Нахождение пользователя с указанным Email в БД
				User user = await _userManager.FindByEmailAsync(pmodel.Email);

				// Код отправляется только для существующих пользователей с подтвержденным Email
				if (user != null && await _userManager.IsEmailConfirmedAsync(user) == true)
				{
					SendPasswordResetMailAsync(user);
					return View("~/Views/Account/ForgotPasswordConfirmation.cshtml", user.Email);
				}
				else
					// @todo locale
					ModelState.AddModelError("", "forgot password: user not found or user's email is not confirmed");
			}

			return View(pmodel);
		}

		/// <summary>
		/// Метод действия для отображения страницы сброса пароля
		/// </summary>
		[HttpGet]
		[AllowAnonymous]
		public IActionResult ResetPassword(string pemail = null, string ptoken = null)
		{
			InitResetPasswordViewData();

			if (pemail == null || ptoken == null)
				return NotFound();  // @todo exception page

			ResetPasswordViewModel model = new ResetPasswordViewModel()
			{
				Email = pemail,
				Token = ptoken
			};

			return View(model);
		}

		/// <summary>
		/// Метод действия для осуществления сброса пароля
		/// </summary>
		[HttpPost]
		[AllowAnonymous]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> ResetPassword(ResetPasswordViewModel pmodel)
		{
			InitResetPasswordViewData();

			if (ModelState.IsValid == true)
			{
				// Нахождение пользователя с указанным Email в БД
				User user = await _userManager.FindByEmailAsync(pmodel.Email);

				if (user != null && await _userManager.IsEmailConfirmedAsync(user) == true)
				{
					// @todo вынести if в отдельную функцию
					// Если пользователь существует, и его email подтвержден, идет смена пароля
					IdentityResult result = await _userManager.ResetPasswordAsync(user, pmodel.Token, pmodel.NewPassword);
					if (result.Succeeded == true)
						return View("~/Views/Account/ResetPasswordConfirmation.cshtml");

					// @todo вынести в отдельную функцию
					foreach (var error in result.Errors)
						ModelState.AddModelError(String.Empty, error.Description);
				}
			}

			return View(pmodel);
		}
	}
}