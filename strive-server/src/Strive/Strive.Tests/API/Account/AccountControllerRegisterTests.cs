using Microsoft.AspNetCore.Mvc;
using Strive.API.Controllers;
using Strive.Data.Dtos.Account;
using Xunit;

namespace Strive.Tests.API.Account
{
    public class AccountControllerRegisterTests : AccountControllerTests
    {
        [Fact]
        public void RegisterReturnsBadRequestOnInvalidData()
        {
            var registerRequest = new RegisterRequestDto()
            {
                Email = "test@gmail.com",
                Username = "username",
                Password = "password",
                PasswordConfirm = "password"
            };
            AccountController controller = this.AccountControllerInstance;
            controller.ModelState.AddModelError("error", "error");

            IActionResult result = controller.Register(registerRequest);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void RegisterReturnsOkOnCorrectData()
        {
            var registerRequest = new RegisterRequestDto()
            {
                Email = "test@gmail.com",
                Username = "username",
                Password = "password",
                PasswordConfirm = "password"
            };
            AccountController controller = this.AccountControllerInstance;

            IActionResult result = controller.Register(registerRequest);

            Assert.IsType<OkResult>(result);
        }
    }
}