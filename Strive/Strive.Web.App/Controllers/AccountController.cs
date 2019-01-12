using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Strive.Data.ViewModels.Account.Login;

namespace Strive.Web.App.Controllers
{
    public class AccountController : Controller
    {
        private readonly IStringLocalizer<AccountController> _localizer;

        #region PrivateMethods

        private void InitLoginViewData()
        {
            ViewData["TitleSecondary"] = _localizer["TitleSecondaryLogin"];
        }

        private void InitRegisterViewData()
        {
            ViewData["TitleSecondary"] = _localizer["TitleSecondaryRegister"];
        }

        #endregion

        public AccountController(IStringLocalizer<AccountController> plocalizer)
        {
            _localizer = plocalizer;
        }

        [HttpGet]
        public IActionResult Login()
        {
            InitLoginViewData();
            return View();
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel pmodel)
        {
            InitLoginViewData();
            return View();
        }

        [HttpGet]
        public IActionResult Register()
        {
            InitRegisterViewData();
            return View();
        }
    }
}