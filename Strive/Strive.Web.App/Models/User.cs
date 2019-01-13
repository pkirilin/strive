using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace Strive.Web.App.Models
{
    /// <summary>
    /// Сущность "Пользователь". Описывает основные данные пользователя системы
    /// </summary>
    public class User : IdentityUser
    {
        #region DataProperties

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
