using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Strive.Communication.Emails;
using Strive.Communication.Emails.EmailBuilders;
using Strive.Web.App.Models;
using Strive.Web.App.ViewModels.Account;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace Strive.Web.App.Controllers
{
	/// <summary>
	/// Контроллер учетных записей
	/// </summary>
	[Route("account")]
	public class AccountController : StriveController
	{
		private readonly IStringLocalizer<AccountController> _localizer;

		private readonly UserManager<User> _userManager;

		private readonly SignInManager<User> _signInManager;

		private readonly IOptions<EmailConfig> _emailConfigOptions;

		public AccountController(
			StriveDbContext pdb,
			IStringLocalizer<SharedResources> psharedLocalizer,
			IStringLocalizer<AccountController> plocalizer,
			UserManager<User> puserManager,
			SignInManager<User> psignInManager,
			IOptions<EmailConfig> pemailConfigOptions) : base(pdb, psharedLocalizer)
		{
			_localizer = plocalizer;
			_userManager = puserManager;
			_signInManager = psignInManager;
			_emailConfigOptions = pemailConfigOptions;
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

		/// <summary>
		/// Инициализация параметров локализации email-сообщений по умолчанию
		/// </summary>
		/// <param name="psubjectKey">Имя темы письма в ресурсах локализации</param>
		/// <param name="pbodyKey">Имя тела письма в ресурсах локализации</param>
		/// <param name="pfromKey">Имя темы письма в ресурсах локализации</param>
		/// <returns>Объект параметров локализации</returns>
		private EmailLocalizationParameters InitEmailLocalizationParameters(
			string psubjectKey, string pbodyKey, string pfromKey = "Email-From")
		{
			var emailLocalizationParameters = new EmailLocalizationParameters()
			{
				From = _localizer[pfromKey],
				Subject = _localizer[psubjectKey],
				Body = _localizer[pbodyKey]
			};
			return emailLocalizationParameters;
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

			var emailLocalizationParameters = InitEmailLocalizationParameters(
				"Email-ConfirmRegistration-Subject", "Email-ConfirmRegistration-Body");

			var emailBuilder = new ConfirmRegistrationEmailBuilder(
				_emailConfigOptions.Value, emailLocalizationParameters, confirmationLink);
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

			var emailLocalizationParameters = InitEmailLocalizationParameters(
				"Email-ResetPassword-Subject", "Email-ResetPassword-Body");

			var emailBuilder = new PasswordResetEmailBuilder(
				_emailConfigOptions.Value, emailLocalizationParameters, passwordResetLink);
			var emailSender = new EmailSender(emailBuilder);
			await emailSender.SendEmailAsync(puser.Email);
		}

		/// <summary>
		/// Добавление к состоянию модели всех возникших ошибок Identity
		/// </summary>
		/// <param name="presult">Результат действия Identity</param>
		private void AddIdentityErrorsToModelState(IdentityResult presult)
		{
			foreach (IdentityError error in presult.Errors)
				ModelState.AddModelError(String.Empty, error.Description);
		}

		/// <summary>
		/// Попытка создать нового пользователя и получение результата
		/// </summary>
		private async Task<User> TryCreateUserAsync(RegisterViewModel pmodel)
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
				return user;

			AddIdentityErrorsToModelState(result);
			return null;
		}

		/// <summary>
		/// Проверка, существует ли пользователь и подтвержден ли его email
		/// </summary>
		/// <param name="puser">Пользователь, которого необходимо проверить</param>
		private async Task<bool> IsUserNotNullAndEmailConfirmedAsync(User puser)
		{
			return puser != null && await _userManager.IsEmailConfirmedAsync(puser) == true;
		}

		#endregion

		/// <summary>
		/// Метод действия для показа пользователю страницы входа в учетную запись
		/// </summary>
		[HttpGet]
		[Route("login")]
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
		[Route("login")]
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
						// @todo создать дополнительный ajax-метод для валидации на клиенте
						ModelState.AddModelError(String.Empty, "Email confirmation error");
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
					// @todo создать дополнительный ajax-метод для валидации на клиенте
					ModelState.AddModelError("", "Sign in error: incorrect data");
				}
			}
			return View(pmodel);
		}

		/// <summary>
		/// Метод действия для показа пользователю страницы регистрации учетной записи
		/// </summary>
		[HttpGet]
		[Route("register")]
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
		[Route("register")]
		public async Task<IActionResult> Register(RegisterViewModel pmodel)
		{
			InitRegisterViewData();

			if (ModelState.IsValid == true)
			{
				User user = await TryCreateUserAsync(pmodel);

				if (user != null)
				{
					// Пользователь был успешно создан
					SendRegisterConfirmationMailAsync(user);
					return View("RegisterConfirmation", user.Email);
				}

				return RedirectToAction("Index", "Home");
			}

			return View(pmodel);
		}

		/// <summary>
		/// Метод действия для подтверждения адреса эл. почты при регистрации
		/// </summary>
		/// <param name="puserID">ID пользователя</param>
		/// <param name="ptoken">Сгенерированный для пользователя код подтверждения</param>
		[HttpGet]
		[AllowAnonymous]
		[Route("confirm_email")]
		public async Task<IActionResult> ConfirmEmail(string puserID, string ptoken)
		{
			if (puserID == null || ptoken == null)
				return GetNotFoundError();

			User user = await _userManager.FindByIdAsync(puserID);
			if (user == null)
				return GetNotFoundError();

			IdentityResult result = await _userManager.ConfirmEmailAsync(user, ptoken);
			if (result.Succeeded == true)
				return RedirectToAction("Index", "Home");
			else
				// @todo создать дополнительный ajax-метод для валидации на клиенте
				return NotFound();
		}

		/// <summary>
		/// Метод действия для выхода из учетной записи
		/// </summary>
		[HttpPost]
		[ValidateAntiForgeryToken]
		[Route("logout")]
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
		[Route("forgot_password")]
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
		[Route("forgot_password")]
		public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel pmodel)
		{
			InitForgotPasswordViewData();

			if (ModelState.IsValid == true)
			{
				// Нахождение пользователя с указанным Email в БД
				User user = await _userManager.FindByEmailAsync(pmodel.Email);

				// Код отправляется только для существующих пользователей с подтвержденным Email
				if (await IsUserNotNullAndEmailConfirmedAsync(user) == true)
				{
					SendPasswordResetMailAsync(user);
					return View("ForgotPasswordConfirmation", user.Email);
				}
				else
					// @todo создать дополнительный ajax-метод для валидации на клиенте
					ModelState.AddModelError("", "forgot password: user not found or user's email is not confirmed");
			}

			return View(pmodel);
		}

		/// <summary>
		/// Метод действия для отображения страницы сброса пароля
		/// </summary>
		[HttpGet]
		[AllowAnonymous]
		[Route("reset_password")]
		public IActionResult ResetPassword(string pemail = null, string ptoken = null)
		{
			InitResetPasswordViewData();

			if (pemail == null || ptoken == null)
				return GetNotFoundError();

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
		[Route("reset_password")]
		public async Task<IActionResult> ResetPassword(ResetPasswordViewModel pmodel)
		{
			InitResetPasswordViewData();

			if (ModelState.IsValid == true)
			{
				// Нахождение пользователя с указанным Email в БД
				User user = await _userManager.FindByEmailAsync(pmodel.Email);

				if (await IsUserNotNullAndEmailConfirmedAsync(user) == true)
				{
					// Если пользователь существует, и его email подтвержден, идет смена пароля
					IdentityResult result = await _userManager.ResetPasswordAsync(user, pmodel.Token, pmodel.NewPassword);
					if (result.Succeeded == true)
						return View("ResetPasswordConfirmation");

					AddIdentityErrorsToModelState(result);
				}
			}

			return View(pmodel);
		}
	}
}