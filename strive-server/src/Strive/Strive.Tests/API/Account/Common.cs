using System;
using Microsoft.AspNetCore.Authorization;
using Strive.API.Controllers;
using Xunit;

namespace Strive.Tests.API.Account
{
    public class AccountControllerCommonTests : AccountControllerTests
    {
        [Fact]
        public void DecoratedWithAuthorizeAttribute()
        {
            Assert.NotNull(Attribute.GetCustomAttribute(
                typeof(AccountController),
                typeof(AuthorizeAttribute)));
        }
    }
}
