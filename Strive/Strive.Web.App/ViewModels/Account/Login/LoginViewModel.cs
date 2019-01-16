using System;
using System.Collections.Generic;
using System.Text;

namespace Strive.Web.App.ViewModels.Account.Login
{
    /// <summary>
    /// Модель представления для входа пользователя в систему
    /// </summary>
    public class LoginViewModel : LoginRegisterViewModel
    {
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
