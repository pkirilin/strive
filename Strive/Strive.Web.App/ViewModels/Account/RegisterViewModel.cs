using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace Strive.Web.App.ViewModels.Account
{
	/// <summary>
	/// Модель представления для регистрации пользователя в системе
	/// </summary>
	public class RegisterViewModel
	{
		/// <summary>
		/// Имя пользователя/Логин
		/// </summary>
		/// @todo доп. валидация на формат
		[Display(Name = "Account-Label-Username")]
		[Required(ErrorMessage = "Validation-Error-UserNameRequired")]
		[Remote("check-user-name-remote", "account", ErrorMessage = "Validation-Error-UserNameRemoteFailed")]
		public string UserName { get; set; }

		/// <summary>
		/// Адрес электронной почты пользователя
		/// </summary>
		[Display(Name = "Account-Label-Email")]
		[Required(ErrorMessage = "Validation-Error-EmailRequired")]
		[EmailAddress(ErrorMessage = "Validation-Error-EmailIncorrectFormat")]
		[Remote("check-email-remote", "account", ErrorMessage = "Validation-Error-EmailRemoteFailed")]
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
		/// Строка для повторного ввода пароля и его подтверждения
		/// </summary>
		[Display(Name = "Account-Label-PasswordConfirm")]
		[Required(ErrorMessage = "Validation-Error-PasswordConfirmRequired")]
		[Compare("Password", ErrorMessage = "Validation-Error-PasswordConfirmCompareFailed")]
		public string PasswordConfirm { get; set; }
	}
}
