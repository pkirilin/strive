using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Strive.Web.App.ViewModels.Account
{
    public class LoginRegisterViewModel
    {
        [Required]
        [RegularExpression(@"^[A-Za-z][A-Za-z0-9]{2,63}@[a-z][a-z0-9]{2,246}\.[a-z]{2,4}")]
        public string Email { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 4)]
        public string Password { get; set; }
    }
}
