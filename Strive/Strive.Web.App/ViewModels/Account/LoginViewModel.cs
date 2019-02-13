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
		[Display(Name = "Email")]
		[Required(ErrorMessage = "Email is required!")]
		[EmailAddress(ErrorMessage = "Email has an incorrect format!")]
		public string Email { get; set; }

		/// <summary>
		/// Пароль пользователя для входа в систему
		/// </summary>
		/// @todo добавить проверку на допустимые символы
		[Display(Name = "Password")]
		[Required(ErrorMessage = "Password is required!")]
		[StringLength(20, MinimumLength = 4, ErrorMessage = "Password length must be from 4 to 20!")]
		public string Password { get; set; }

		/// <summary>
		/// Параметр, показывающий, нужно ли сохранять куки пользователя после закрытия браузера
		/// </summary>
		[Display(Name = "Remember me")]
		public bool RememberMe { get; set; }

		/// <summary>
		/// Адрес возврата пользователя на запрашиваемый URL после успешной авторизации
		/// </summary>
		public string ReturnUrl { get; set; }
	}
}
