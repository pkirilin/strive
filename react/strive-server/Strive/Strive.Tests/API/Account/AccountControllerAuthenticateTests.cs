using System;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.Data.Dtos;
using Strive.Data.Entities;
using Xunit;

namespace Strive.Tests.API.Account
{
	public class AccountControllerAuthenticateTests : AccountControllerTests
	{
		[Fact]
		public void UserUnauthorized()
		{
			var loginRequest = new UserLoginRequestDto()
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
		public void TokenCreatedWithoutException()
		{
			var loginRequest = new UserLoginRequestDto()
			{
				Email = "username",
				Password = "password"
			};

			_accountServiceMock
				.Setup(service => service.Authenticate(loginRequest.Email, loginRequest.Password))
				.Returns(() => new User());

			IActionResult result = this.AccountControllerInstance.Authenticate(loginRequest);

			Assert.IsType<OkObjectResult>(result);
		}
	}
}
