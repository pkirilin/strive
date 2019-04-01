using System;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Strive.API.Controllers;
using Strive.Data.Dtos;
using Strive.Data.Entities;
using Xunit;

namespace Strive.Tests.API.Account
{
	public class AccountControllerRegisterTests : AccountControllerTests
	{
		[Fact]
		public void RegisterCorrectData()
		{
			var registerRequest = new UserRegisterRequestDto()
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

		[Fact]
		public void RegisterDataHasValidationErrors()
		{
			var registerRequest = new UserRegisterRequestDto()
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
		public void RegisterCorrectDataButAccountServiceThrewException()
		{
			var registerRequest = new UserRegisterRequestDto()
			{
				Email = "test@gmail.com",
				Username = "username",
				Password = "password",
				PasswordConfirm = "password"
			};
			_accountServiceMock
				.Setup(service => service.Create(It.IsNotNull<User>(), It.IsNotNull<string>()))
				.Throws<Exception>();
			AccountController controller = this.AccountControllerInstance;
			controller.ModelState.AddModelError("error", "error");

			IActionResult result = controller.Register(registerRequest);

			Assert.IsType<BadRequestObjectResult>(result);
		}
	}
}
