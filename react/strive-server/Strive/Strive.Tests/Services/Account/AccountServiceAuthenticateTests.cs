using System;
using Strive.Data.Services;
using Xunit;

namespace Strive.Tests.Services.Account
{
	public class AccountServiceAuthenticateTests : AccountServiceTests
	{
		[Fact]
		public void AuthenticationFailsOnIncorrectArguments()
		{
			AccountService accountService = this.AccountServiceInstance;

			Assert.Throws<ArgumentException>(() => accountService.Authenticate("", "password"));
			Assert.Throws<ArgumentException>(() => accountService.Authenticate(null, "password"));
			Assert.Throws<ArgumentException>(() => accountService.Authenticate("username", ""));
			Assert.Throws<ArgumentException>(() => accountService.Authenticate("username", null));
		}
	}
}
