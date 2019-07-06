using System;
using Moq;
using Strive.Data.Entities;
using Strive.Data.Services.Classes;
using Strive.Exceptions;
using Xunit;

namespace Strive.Tests.Services.Account
{
    public class AccountServiceAuthorizeTests : AccountServiceTests
    {
        [Fact]
        public void AuthenticationFailsOnIncorrectArguments()
        {
            AccountService accountService = this.AccountServiceInstance;

            Assert.Throws<ArgumentException>(() => accountService.Authorize("", "password"));
            Assert.Throws<ArgumentException>(() => accountService.Authorize(null, "password"));
            Assert.Throws<ArgumentException>(() => accountService.Authorize("username", ""));
            Assert.Throws<ArgumentException>(() => accountService.Authorize("username", null));
        }

        [Fact]
        public void AuthorizeThrowsDatabaseExceptionWhenRepoFails()
        {
            _userRepositoryMock.Setup(repo => repo.GetSingleOrDefault(It.IsAny<Func<User, bool>>()))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() =>
            {
                this.AccountServiceInstance.Authorize("email", "password");
            });

            _userRepositoryMock.Verify(repo =>
                repo.GetSingleOrDefault(It.IsAny<Func<User, bool>>()), Times.Once);
        }

        [Fact]
        public void AuthenticationFailsOnNotExistingUser()
        {
            string username = "username";
            _userRepositoryMock.Setup(repo => repo.GetSingleOrDefault(It.IsAny<Func<User, bool>>()))
                .Returns(null as User);
            AccountService accountService = this.AccountServiceInstance;

            Assert.Throws<StriveDatabaseException>(() => accountService.Authorize(username, "password"));
        }

        [Fact]
        public void AuthenticationFailsOnIncorrectPassword()
        {
            string email = "email@email.com";
            string password = "password";
            _userRepositoryMock.Setup(repo => repo.GetSingleOrDefault(It.IsAny<Func<User, bool>>()))
                .Returns(new User()
                {
                    Id = 1,
                    Email = email,
                    Username = "username",
                    PasswordSalt = new byte[128],
                    PasswordHash = new byte[64]
                });
            AccountService accountService = this.AccountServiceInstance;

            Assert.Throws<StriveSecurityException>(() => accountService.Authorize(email, password));
        }

        [Fact]
        public void AuthenticationFailsOnNotVerifiedPassword()
        {
            string email = "email@email.com";
            string password = "password";
            _userRepositoryMock.Setup(repo => repo.GetSingleOrDefault(It.IsAny<Func<User, bool>>()))
                .Returns(new User()
                {
                    PasswordSalt = new byte[1],
                    PasswordHash = new byte[1]
                });
            AccountService accountService = this.AccountServiceInstance;

            Assert.Throws<StriveSecurityException>(() => accountService.Authorize(email, password));
        }
    }
}