using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Strive.Web.App.ViewModels.Account.Register
{
    public class RegisterViewModel : LoginRegisterViewModel
    {
        [Required]
        // @todo [Remote]
        public string Username { get; set; }

        [Required]
        [Compare("Password")]
        public string PasswordConfirm { get; set; }
    }
}
