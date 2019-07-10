using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.Data.Dtos.Account;
using Strive.Data.Entities;
using Strive.Exceptions;
using Strive.Helpers.Settings;
using Xunit;

namespace Strive.Tests.API.Account
{
    public class AccountControllerAuthorizeTests : AccountControllerTests
    {
        //[Fact]
        //public void AuthorizeReturnsUnauthorizedIfServiceFailedWithCustomException()
        //{
        //    var loginRequest = new AuthorizationRequestDto()
        //    {
        //        Email = "username",
        //        Password = "password"
        //    };

        //    _accountServiceMock
        //        .Setup(service => service.Authorize(It.IsNotNull<string>(), It.IsNotNull<string>()))
        //        .Throws<StriveException>();

        //    IActionResult result = this.AccountControllerInstance.Authorize(loginRequest);

        //    Assert.IsType<UnauthorizedResult>(result);
        //}

        [Fact]
        public void AuthorizeReturnsOkIfTokenCreatedWithoutException()
        {
            var loginRequest = new AuthorizationRequestDto()
            {
                Email = "username",
                Password = "password"
            };

            _accountServiceMock
                .Setup(service => service.Authorize(loginRequest.Email, loginRequest.Password))
                .Returns(new User()
                {
                    Id = 1,
                    Email = "email",
                    Username = "username"
                });

            IActionResult result = this.AccountControllerInstance.Authorize(loginRequest);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}