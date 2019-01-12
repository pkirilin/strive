using System;
using System.Collections.Generic;
using System.Text;

namespace Strive.Data.Entities
{
    /// <summary>
    /// Сущность "Пользователь". Описывает основные данные пользователя системы
    /// </summary>
    public class User
    {
        #region DataProperties

        /// <summary>
        /// ID пользователя системы
        /// </summary>
        public int UserID { get; set; }

        /// <summary>
        /// Имя пользователя (логин) системы
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Адрес электронной почты пользователя системы
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Пароль пользователя системы
        /// </summary>
        public string Password { get; set; }

        #endregion

        #region ReferenceProperties



        #endregion

        #region NavigationProperties

        /// <summary>
        /// Дополнительные данные пользователя
        /// </summary>
        public UserDetails Details { get; set; }

        #endregion
    }
}
