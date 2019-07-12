using Microsoft.AspNetCore.Mvc;
using Strive.Data.Dtos.Account;
using Strive.Data.Entities;
using Xunit;

namespace Strive.Tests.API.Account
{
    public class AccountControllerAuthorizeTests : AccountControllerTests
    {
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