using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.Data.Dtos.Account;
using Strive.Data.Entities;
using Strive.Helpers.Settings;
using Xunit;

namespace Strive.Tests.API.Account
{
    public class AccountControllerAuthenticateTests : AccountControllerTests
    {
        [Fact]
        public void AuthenticateReturnsStatus500IfTokenCreatedWithException()
        {
            var loginRequest = new LoginRequestDto()
            {
                Email = "username",
                Password = "password"
            };
            // Configuring settings to return null to get exception for the test
            _appSettingsMock.Setup(s => s.Value)
                .Returns(null as AppSettings);

            ObjectResult result = this.AccountControllerInstance.Authenticate(loginRequest) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public void AuthenticateReturnsUnauthorizedIfServiceFailed()
        {
            var loginRequest = new LoginRequestDto()
            {
                Email = "username",
                Password = "password"
            };

            _accountServiceMock
                .Setup(service => service.Authenticate(It.IsNotNull<string>(), It.IsNotNull<string>()))
                .Throws<Exception>();

            IActionResult result = this.AccountControllerInstance.Authenticate(loginRequest);

            Assert.IsType<UnauthorizedResult>(result);
        }

        [Fact]
        public void AuthenticateReturnsOkIfTokenCreatedWithoutException()
        {
            var loginRequest = new LoginRequestDto()
            {
                Email = "username",
                Password = "password"
            };

            _accountServiceMock
                .Setup(service => service.Authenticate(loginRequest.Email, loginRequest.Password))
                .Returns(new User()
                {
                    Id = 1,
                    Email = "email",
                    Username = "username"
                });

            IActionResult result = this.AccountControllerInstance.Authenticate(loginRequest);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}