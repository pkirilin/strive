using AutoMapper;
using Microsoft.Extensions.Options;
using Moq;
using Strive.API;
using Strive.API.Controllers;
using Strive.Data.Services.Interfaces;
using Strive.Helpers.Settings;

namespace Strive.Tests.API.Account
{
    public class AccountControllerTests
    {
        protected readonly Mock<IMapper> _mapperMock;

        protected readonly Mock<IOptions<AppSettings>> _appSettingsMock;

        protected readonly Mock<IAccountService> _accountServiceMock;

        public AccountControllerTests()
        {
            var mapperConfig = new MapperConfiguration(cfg => { cfg.AddProfile(new AutoMapperProfile()); });

            _mapperMock = new Mock<IMapper>();

            _appSettingsMock = new Mock<IOptions<AppSettings>>();
            _appSettingsMock.Setup(settings => settings.Value)
                .Returns(new AppSettings()
                {
                    Secret =
                        "BgIRdbSedwP6zqP7pnXu3_F1PSpNLrV-PaxdB7ISCTRocJ9kYOdsleK6x0NbTAlgf1LOJxlcQ9350Bha4Xgh5o7-qQ1LA1rqgshVWxqt_osnk9tWyapZfrKFIHfMbPDckNivS0NGTNggshvZSjALPxtIr8MUfm-JHbf-u35CZk8a88g09rK3pgX2ANVUe3Ps8kHQo1bt1YhJTW1Y6L1s1DbXvyAGoe2I8aSS9bQQl2p-XkFBJRn3dvZUzrmG6g60-bxzv3Z2w8zcQpqADBjHhaZ8yEVDuY0t-QaPFnuyYTHo4qgpKGrYlrMKukZYvDBmc48DcbO3Djpr4NYwFyXOMQ"
                });

            _accountServiceMock = new Mock<IAccountService>();
        }

        public AccountController AccountControllerInstance
        {
            get
            {
                return new AccountController(
                    _accountServiceMock.Object,
                    _mapperMock.Object,
                    _appSettingsMock.Object);
            }
        }
    }
}