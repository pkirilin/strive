using System.ComponentModel.DataAnnotations;

namespace Strive.Web.App.ViewModels.Account
{
	/// <summary>
	/// Модель представления для страницы сброса пароля
	/// </summary>
	public class ResetPasswordViewModel
	{
		/// <summary>
		/// Адрес электронной почты пользователя
		/// </summary>
		[Required]
		[EmailAddress]
		public string Email { get; set; }

		/// <summary>
		/// Старый пароль пользователя для входа в систему
		/// </summary>
		[Required]
		[StringLength(20, MinimumLength = 4)]
		public string NewPassword { get; set; }

		/// <summary>
		/// Новый пароль пользователя для входа в систему
		/// </summary>
		[Required]
		[Compare("NewPassword")]
		public string NewPasswordConfirm { get; set; }

		/// <summary>
		/// Код, сгенерированный пользователю для сброса пароля
		/// </summary>
		public string Token { get; set; }
	}
}
