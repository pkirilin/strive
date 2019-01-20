using System.ComponentModel.DataAnnotations;

namespace Strive.Web.App.ViewModels.Account.ForgotPassword
{
    /// <summary>
    /// Модель представления для страницы запроса сброса пароля
    /// </summary>
    public class ForgotPasswordViewModel
    {
        /// <summary>
        /// Адрес электронной почты пользователя
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
