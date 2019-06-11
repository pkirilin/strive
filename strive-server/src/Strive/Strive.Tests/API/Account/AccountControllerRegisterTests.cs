using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Dtos.Account;
using Strive.Data.Entities;
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
        public void RegisterReturnsStatus500OnServiceCreateException()
        {
            var registerRequest = new RegisterRequestDto()
            {
                Email = "test@gmail.com",
                Username = "username",
                Password = "password",
                PasswordConfirm = "password"
            };
            _accountServiceMock
                .Setup(service => service.Create(It.IsAny<User>(), It.IsAny<string>()))
                .Throws<Exception>();

            ObjectResult result = this.AccountControllerInstance.Register(registerRequest) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void RegisterReturnsStatus500OnServiceIsEmailExistsException()
        {
            var registerRequest = new RegisterRequestDto()
            {
                Email = "test@gmail.com",
                Username = "username",
                Password = "password",
                PasswordConfirm = "password"
            };
            _accountServiceMock
                .Setup(service => service.IsEmailExists(It.IsAny<string>()))
                .Throws<Exception>();

            ObjectResult result = this.AccountControllerInstance.Register(registerRequest) as ObjectResult;

            _accountServiceMock.Verify(service => service.IsEmailExists(It.IsAny<string>()), Times.Once);
            _accountServiceMock.Verify(service => service.IsUsernameExists(It.IsAny<string>()), Times.Never);

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void RegisterReturnsStatus500OnServiceIsUsernameExistsException()
        {
            var registerRequest = new RegisterRequestDto()
            {
                Email = "test@gmail.com",
                Username = "username",
                Password = "password",
                PasswordConfirm = "password"
            };
            _accountServiceMock
                .Setup(service => service.IsUsernameExists(It.IsAny<string>()))
                .Throws<Exception>();

            ObjectResult result = this.AccountControllerInstance.Register(registerRequest) as ObjectResult;

            _accountServiceMock.Verify(service => service.IsEmailExists(It.IsAny<string>()), Times.Once);
            _accountServiceMock.Verify(service => service.IsUsernameExists(It.IsAny<string>()), Times.Once);

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
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