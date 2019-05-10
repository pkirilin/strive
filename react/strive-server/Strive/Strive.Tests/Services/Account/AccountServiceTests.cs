using Moq;
using Strive.Data.Repositories.Interfaces;
using Strive.Data.Services.Classes;

namespace Strive.Tests.Services.Account
{
    public class AccountServiceTests
	{
		protected readonly Mock<IUserRepository> _userRepositoryMock;

		public AccountServiceTests()
		{
			_userRepositoryMock = new Mock<IUserRepository>();
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
