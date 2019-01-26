using System.ComponentModel.DataAnnotations;

namespace Strive.Web.App.ViewModels.Account
{
	/// <summary>
	/// Модель представления для регистрации пользователя в системе
	/// </summary>
	public class RegisterViewModel
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
		/// Имя пользователя/Логин
		/// </summary>
		[Required]
		// @todo [Remote]
		public string UserName { get; set; }

		/// <summary>
		/// Строка для повторного ввода пароля и его подтверждения
		/// </summary>
		[Required]
		[Compare("Password")]
		public string PasswordConfirm { get; set; }
	}
}
