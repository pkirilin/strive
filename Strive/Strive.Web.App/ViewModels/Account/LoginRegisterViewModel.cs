using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Strive.Web.App.ViewModels.Account
{
    /// <summary>
    /// Базовая модель представления для входа и регистрации пользователя
    /// </summary>
    public class LoginRegisterViewModel
    {
        /// <summary>
        /// Адрес электронной почты пользователя
        /// </summary>
        [Required]
        //[RegularExpression(@"^[A-Za-z][A-Za-z0-9]{2,63}@[a-z][a-z0-9]{2,246}\.[a-z]{2,4}")]
        [EmailAddress]
        public string Email { get; set; }

        /// <summary>
        /// Пароль пользователя для входа в систему
        /// </summary>
        [Required]
        [StringLength(20, MinimumLength = 4)]
        public string Password { get; set; }
    }
}
