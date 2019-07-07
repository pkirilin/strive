using System;
using Microsoft.AspNetCore.Authorization;
using Strive.API.Controllers;
using Xunit;

namespace Strive.Tests.API.Projects
{
    public class ProjectsControllerCommonTests
    {
        [Fact]
        public void DecoratedWithAuthorizeAttribute()
        {
            Assert.NotNull(Attribute.GetCustomAttribute(
                typeof(ProjectsController),
                typeof(AuthorizeAttribute)));
        }
    }
}
