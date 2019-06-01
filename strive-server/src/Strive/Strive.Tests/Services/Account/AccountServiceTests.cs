using Moq;
using Strive.Data.Entities;
using Strive.Data.Repositories;
using Strive.Data.Services.Classes;

namespace Strive.Tests.Services.Account
{
    public class AccountServiceTests
    {
        protected readonly Mock<IRepository<User>> _userRepositoryMock;

        public AccountServiceTests()
        {
            _userRepositoryMock = new Mock<IRepository<User>>();
        }

        public AccountService AccountServiceInstance
        {
            get
            {
                return new AccountService(_userRepositoryMock.Object);
            }
        }
    }
}