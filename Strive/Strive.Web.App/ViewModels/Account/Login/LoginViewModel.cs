using System;
using System.Collections.Generic;
using System.Text;

namespace Strive.Web.App.ViewModels.Account.Login
{
    public class LoginViewModel : LoginRegisterViewModel
    {
        public bool RememberMe { get; set; }

        public string ReturnUrl { get; set; }
    }
}
