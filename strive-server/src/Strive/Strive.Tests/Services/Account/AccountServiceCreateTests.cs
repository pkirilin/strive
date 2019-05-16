using System;
using Strive.Data.Entities;
using Strive.Exceptions;
using Xunit;

namespace Strive.Tests.Services.Account
{
	public class AccountServiceCreateTests : AccountServiceTests
	{
		[Fact]
		public void CreateFailsWhenPasswordIsNull()
		{
			User user = new User();
			string password = null;

			Assert.Throws<StriveSecurityException>(() =>
				this.AccountServiceInstance.Create(user, password));
		}

		[Fact]
		public void CreateFailsWhenPasswordIsEmptyOrWhitespace()
		{
			User user = new User();

			Assert.Throws<StriveSecurityException>(() =>
				this.AccountServiceInstance.Create(user, ""));
			Assert.Throws<StriveSecurityException>(() =>
				this.AccountServiceInstance.Create(user, " "));
		}

		[Fact]
		public void CreateFailsWhenCannotAddUser()
		{
			User user = new User();
			string password = "password";
			_userRepositoryMock.Setup(repo => repo.Add(user))
				.Throws<Exception>();

			Assert.Throws<StriveDatabaseException>(() =>
				this.AccountServiceInstance.Create(user, password));
		}
	}
}
