using System;
using System.Collections.Generic;
using System.Text;

namespace Strive.Data.Entities
{
    /// <summary>
    /// Сущность "Данные пользователя". Описывает дополнительные данные о пользователе системы
    /// </summary>
    public class UserDetails
    {
        #region DataProperties

        /// <summary>
        /// ID данных пользователя
        /// </summary>
        public int UserDetailsID { get; set; }

        #endregion

        #region ReferenceProperties

        /// <summary>
        /// ID пользователя, которому принадлежат данные
        /// </summary>
        public int UserID { get; set; }

        #endregion

        #region NavigationProperties

        /// <summary>
        /// Ссылка на пользователя, которому принадлежат данные
        /// </summary>
        public User User { get; set; }

        #endregion
    }
}
