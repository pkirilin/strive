using System;
using System.Collections.Generic;
using System.Text;

namespace Strive.Web.App.ViewModels.Account.Register
{
    public class RegisterViewModel : LoginRegisterViewModel
    {
        public string Username { get; set; }

        public string PasswordConfirm { get; set; }
    }
}
