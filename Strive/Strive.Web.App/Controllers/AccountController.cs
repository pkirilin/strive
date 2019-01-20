using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Strive.Communication.Emails;
using Strive.Communication.Emails.EmailBuilders;
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

        #region Private

        /// <summary>
        /// Инициализация контейнера ViewData для страниц, относящихся к Login
        /// </summary>
        private void InitLoginViewData()
        {
            ViewData["TitleSecondary"] = _localizer["TitleSecondary-Login"];
        }

        /// <summary>
        /// Инициализация контейнера ViewData для страниц, относящихся к Register
        /// </summary>
        private void InitRegisterViewData()
        {
            ViewData["TitleSecondary"] = _localizer["TitleSecondary-Register"];
        }

        // @todo общая функция, вынести в отдельную dll
        /// <summary>
        /// Проверка является ли ссылка ссылкой, относящейся к приложению 
        /// </summary>
        private bool IsUrlExistsInApplication(string purl)
        {
            return !String.IsNullOrEmpty(purl) && Url.IsLocalUrl(purl);
        }

        /// <summary>
        /// Отправка пользователю email сообщения для подтверждения его регистрации
        /// </summary>
        private async void SendRegisterConfirmationMailAsync(User puser)
        {
            string confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(puser);
            string confirmationLink = Url.Action(
                "ConfirmEmail",
                "Account",
                new { puserID = puser.Id, ptoken = confirmationToken },
                protocol: HttpContext.Request.Scheme);
            var emailBuilder = new ConfirmRegistrationEmailBuilder(confirmationLink);
            var emailSender = new EmailSender(emailBuilder);
            await emailSender.SendEmailAsync(puser.Email);
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
                UserName = pmodel.UserName,
                Email = pmodel.Email
                //,
                //Details = userDetails
            };

            // Добавление пользователя в БД и получение результата
            IdentityResult result = await _userManager.CreateAsync(user, pmodel.Password);

            // Проверка результата добавления пользователя
            if (result.Succeeded == true)
            {
                SendRegisterConfirmationMailAsync(user);
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
                // Проверка пользователя
                User user = await _userManager.FindByEmailAsync(pmodel.Email);
                if (user != null)
                {
                    // Проверка, подтвержден ли email
                    if (await _userManager.IsEmailConfirmedAsync(user) == false)
                    {
                        // @todo locale
                        ModelState.AddModelError(String.Empty, "email not confirmed");
                        return View(pmodel);
                    }
                }

                // Попытка входа с указанными данными и получение результата
                SignInResult result = await _signInManager.PasswordSignInAsync(
                    user.UserName, pmodel.Password, pmodel.RememberMe, false);

                if (result.Succeeded == true)
                {
                    // Если удалось войти, идет проверка запрашиваемого Url
                    if (IsUrlExistsInApplication(pmodel.ReturnUrl) == true)
                        return Redirect(pmodel.ReturnUrl);
                    else
                        return RedirectToAction("Index", "Home");
                }
                else
                {
                    // @todo locale
                    ModelState.AddModelError("", "sign in error: incorrect data");
                }
            }
            return View(pmodel);
        }

        /// <summary>
        /// Метод действия для показа пользователю страницы регистрации учетной записи
        /// </summary>
        [HttpGet]
        public IActionResult Register()
        {
            InitRegisterViewData();

            // debug
            User u = _db.Users.FirstOrDefault();
            if (u != null)
            {
                _db.Users.Remove(u);
                _db.SaveChanges();
            }

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

        /// <summary>
        /// Метод действия для подтверждения адреса эл. почты при регистрации
        /// </summary>
        /// <param name="puserID">ID пользователя</param>
        /// <param name="ptoken">Сгенерированный для пользователя код подтверждения</param>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string puserID, string ptoken)
        {
            if (puserID == null || ptoken == null)
                return NotFound();  // @todo exception page

            User user = await _userManager.FindByIdAsync(puserID);
            if (user == null)
                return NotFound();  // @todo exception page

            IdentityResult result = await _userManager.ConfirmEmailAsync(user, ptoken);
            if (result.Succeeded == true)
                return RedirectToAction("Index", "Home");
            else
                return NotFound();  // @todo exception page 
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
    }
}