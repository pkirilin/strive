using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Strive.Web.App.ViewModels.Account.Register
{
    /// <summary>
    /// Модель представления для регистрации пользователя в системе
    /// </summary>
    public class RegisterViewModel : LoginRegisterViewModel
    {
        /// <summary>
        /// Имя пользователя/Логин
        /// </summary>
        [Required]
        // @todo [Remote]
        public string Username { get; set; }

        /// <summary>
        /// Строка для повторного ввода пароля и его подтверждения
        /// </summary>
        [Required]
        [Compare("Password")]
        public string PasswordConfirm { get; set; }
    }
}
