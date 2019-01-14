using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Strive.Web.App.Models;
using Strive.Web.App.ViewModels.Account.Login;
using Strive.Web.App.ViewModels.Account.Register;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace Strive.Web.App.Controllers
{
    public class AccountController : Controller
    {
        private readonly IStringLocalizer<AccountController> _localizer;

        private readonly UserManager<User> _userManager;

        private readonly SignInManager<User> _signInManager;

        public AccountController(IStringLocalizer<AccountController> plocalizer,
            UserManager<User> puserManager,
            SignInManager<User> psignInManager)
        {
            _localizer = plocalizer;
            _userManager = puserManager;
            _signInManager = psignInManager;
        }

        #region Login private methods

        private void InitLoginViewData()
        {
            ViewData["TitleSecondary"] = _localizer["TitleSecondaryLogin"];
        }

        private async Task<bool> TrySignInAsync(LoginViewModel pmodel)
        {
            // Попытка залогинить пользователя и получение результата
            SignInResult result = await _signInManager.PasswordSignInAsync(
                pmodel.Email, pmodel.Password, pmodel.RememberMe, false);
            return result.Succeeded;
        }

        private bool IsUrlExistsInApplication(string purl)
        {
            return !String.IsNullOrEmpty(purl) && Url.IsLocalUrl(purl);
        }

        #endregion

        #region Register private methods

        private void InitRegisterViewData()
        {
            ViewData["TitleSecondary"] = _localizer["TitleSecondaryRegister"];
        }

        private async Task<bool> TryCreateUserAsync(RegisterViewModel pmodel)
        {
            // Создание пустых данных для нового пользователя
            //UserDetails userDetails = new UserDetails();

            // Создание нового пользователя
            User user = new User()
            {
                UserName = pmodel.Email,
                Email = pmodel.Email
                //,
                //Details = userDetails
            };

            // Добавление пользователя в БД и получение результата
            IdentityResult result = await _userManager.CreateAsync(user, pmodel.Password);

            // Проверка результата добавления пользователя
            if (result.Succeeded == true)
            {
                // Установка куки для пользователя
                await _signInManager.SignInAsync(user, false);
                return true;
            }
            else
            {
                // Добавление к состоянию модели всех возникших ошибок
                foreach (IdentityError error in result.Errors)
                    ModelState.AddModelError(string.Empty, error.Description);
                return false;
            }
        }

        #endregion

        [HttpGet]
        public IActionResult Login()
        {
            InitLoginViewData();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel pmodel)
        {
            InitLoginViewData();

            if (ModelState.IsValid == true)
            {
                // Попытка входа с указанными данными и получение результата
                bool isAbleToSignIn = await TrySignInAsync(pmodel);

                if (isAbleToSignIn == true)
                {
                    // Если удалось войти, идет проверка запрашиваемого Url
                    if (IsUrlExistsInApplication(pmodel.ReturnUrl) == true)
                        return Redirect(pmodel.ReturnUrl);
                    else
                        return RedirectToAction("Index", "Home");
                }
                else
                {
                    // @todo добавить сообщение об ошибке
                    string errorMessage = "test sign in error";
                    ModelState.AddModelError("", errorMessage);
                }
            }
            return View(pmodel);
        }

        [HttpGet]
        public IActionResult Register()
        {
            InitRegisterViewData();
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel pmodel)
        {
            if (ModelState.IsValid == true)
            {
                bool isUserCreated = await TryCreateUserAsync(pmodel);
                if (isUserCreated == true)
                    return RedirectToAction("Index", "Home");
            }
            return View(pmodel);
        }
    }
}