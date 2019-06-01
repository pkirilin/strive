using System;
using Moq;
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
        public void AuthenticateThrowsDatabaseExceptionWhenRepoFails()
        {
            _userRepositoryMock.Setup(repo => repo.GetSingleOrDefault(It.IsAny<Func<User, bool>>()))
                .Throws<Exception>();

            Assert.Throws<StriveDatabaseException>(() =>
            {
                this.AccountServiceInstance.Authenticate("email", "password");
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

            Assert.Throws<StriveDatabaseException>(() => accountService.Authenticate(username, "password"));
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

            Assert.Throws<StriveSecurityException>(() => accountService.Authenticate(email, password));
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

            Assert.Throws<StriveSecurityException>(() => accountService.Authenticate(email, password));
        }
    }
}