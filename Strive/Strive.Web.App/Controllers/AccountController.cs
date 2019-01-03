using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace Strive.Web.App.Controllers
{
    public class AccountController : Controller
    {
        private readonly IStringLocalizer<AccountController> _localizer;

        public AccountController(IStringLocalizer<AccountController> plocalizer)
        {
            _localizer = plocalizer;
        }

        public IActionResult Login()
        {
            ViewData["TitleSecondary"] = _localizer["TitleSecondaryLogin"];
            return View();
        }

        public IActionResult Register()
        {
            ViewData["TitleSecondary"] = _localizer["TitleSecondaryRegister"];
            return View();
        }
    }
}