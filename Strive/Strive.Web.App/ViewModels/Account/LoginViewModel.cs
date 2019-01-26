using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
		[Required]
		[EmailAddress]
		public string Email { get; set; }

		/// <summary>
		/// Пароль пользователя для входа в систему
		/// </summary>
		[Required]
		[StringLength(20, MinimumLength = 4)]
		public string Password { get; set; }

		/// <summary>
		/// Параметр, показывающий, нужно ли сохранять куки пользователя после закрытия браузера
		/// </summary>
		public bool RememberMe { get; set; }

		/// <summary>
		/// Адрес возврата пользователя на запрашиваемый URL после успешной авторизации
		/// </summary>
		public string ReturnUrl { get; set; }
	}
}
