using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Strive.Web.App.Models;
using Strive.Web.App.ViewModels.Account.Login;
using Strive.Web.App.ViewModels.Account.Register;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace Strive.Web.App.Controllers
{
    public class AccountController : Controller
    {
        private readonly StriveDbContext _db;

        private readonly IStringLocalizer<AccountController> _localizer;

        private readonly UserManager<User> _userManager;

        private readonly SignInManager<User> _signInManager;

        public AccountController(StriveDbContext pdb,
            IStringLocalizer<AccountController> plocalizer,
            UserManager<User> puserManager,
            SignInManager<User> psignInManager)
        {
            _db = pdb;
            _localizer = plocalizer;
            _userManager = puserManager;
            _signInManager = psignInManager;
        }

        #region Login private methods

        /// <summary>
        /// Инициализация контейнера ViewData для страниц, относящихся к Login
        /// </summary>
        private void InitLoginViewData()
        {
            ViewData["TitleSecondary"] = _localizer["TitleSecondaryLogin"];
        }

        /// <summary>
        /// Попытка залогинить пользователя и получение результата
        /// </summary>
        private async Task<bool> TrySignInAsync(LoginViewModel pmodel)
        {
            SignInResult result = await _signInManager.PasswordSignInAsync(
                pmodel.Email, pmodel.Password, pmodel.RememberMe, false);
            return result.Succeeded;
        }

        /// <summary>
        /// Проверка является ли ссылка ссылкой, относящейся к приложению 
        /// </summary>
        private bool IsUrlExistsInApplication(string purl)
        {
            return !String.IsNullOrEmpty(purl) && Url.IsLocalUrl(purl);
        }

        #endregion

        #region Register private methods

        /// <summary>
        /// Инициализация контейнера ViewData для страниц, относящихся к Register
        /// </summary>
        private void InitRegisterViewData()
        {
            ViewData["TitleSecondary"] = _localizer["TitleSecondaryRegister"];
        }

        /// <summary>
        /// Попытка создать нового пользователя и получение результата
        /// </summary>
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

        /// <summary>
        /// Метод действия для показа пользователю страницы входа в учетную запись
        /// </summary>
        [HttpGet]
        public IActionResult Login()
        {
            InitLoginViewData();
            return View();
        }

        /// <summary>
        /// Метод действия для осуществления входа в учетную запись
        /// </summary>
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
        
        /// <summary>
        /// Метод действия для выхода из учетной записи
        /// </summary>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        /// <summary>
        /// Метод действия для показа пользователю страницы регистрации учетной записи
        /// </summary>
        [HttpGet]
        public IActionResult Register()
        {
            InitRegisterViewData();
            return View();
        }

        /// <summary>
        /// Метод действия для осуществления регистрации учетной записи
        /// </summary>
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