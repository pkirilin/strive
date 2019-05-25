using System;
using Strive.Data.Entities;
using Strive.Data.Services.Classes;
using Strive.Exceptions;
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

        [Fact]
        public void AuthenticationFailsOnNotExistingUser()
        {
            string username = "username";
            _userRepositoryMock.Setup(repo => repo.GetByUsername(username))
                .Returns(null as User);
            AccountService accountService = this.AccountServiceInstance;

            Assert.Throws<StriveDatabaseException>(() => accountService.Authenticate(username, "password"));
        }

        [Fact]
        public void AuthenticationFailsOnIncorrectPassword()
        {
            string email = "email@email.com";
            string password = "password";
            _userRepositoryMock.Setup(repo => repo.GetByEmail(email))
                .Returns(new User()
                {
                    PasswordSalt = new byte[128],
                    PasswordHash = new byte[64]
                });
            AccountService accountService = this.AccountServiceInstance;

            Assert.Throws<StriveSecurityException>(() => accountService.Authenticate(email, password));
        }

        [Fact]
        public void AuthenticationFailsOnNotVerifiedPassword()
        {
            string email = "email@email.com";
            string password = "password";
            _userRepositoryMock.Setup(repo => repo.GetByEmail(email))
                .Returns(new User()
                {
                    PasswordSalt = new byte[1],
                    PasswordHash = new byte[1]
                });
            AccountService accountService = this.AccountServiceInstance;

            Assert.Throws<StriveSecurityException>(() => accountService.Authenticate(email, password));
        }
    }
}