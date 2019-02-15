using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace Strive.Web.App.ViewModels.Account
{
	/// <summary>
	/// Модель представления для входа пользователя в систему
	/// </summary>
	public class LoginViewModel
	{
		/// <summary>
		/// Адрес электронной почты пользователя
		/// </summary>
		[Display(Name = "Account-Label-Email")]
		[Required(ErrorMessage = "Validation-Error-EmailRequired")]
		[EmailAddress(ErrorMessage = "Validation-Error-EmailIncorrectFormat")]
		public string Email { get; set; }

		/// <summary>
		/// Пароль пользователя для входа в систему
		/// </summary>
		/// @todo добавить проверку на допустимые символы
		[Display(Name = "Account-Label-Password")]
		[Required(ErrorMessage = "Validation-Error-PasswordRequired")]
		[StringLength(20, MinimumLength = 4, ErrorMessage = "Validation-Error-PasswordIncorrectFormat")]
		public string Password { get; set; }

		/// <summary>
		/// Параметр, показывающий, нужно ли сохранять куки пользователя после закрытия браузера
		/// </summary>
		[Display(Name = "Account-Label-RememberMe")]
		public bool RememberMe { get; set; }

		/// <summary>
		/// Адрес возврата пользователя на запрашиваемый URL после успешной авторизации
		/// </summary>
		public string ReturnUrl { get; set; }
	}
}
