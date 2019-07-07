using System;
using Microsoft.AspNetCore.Authorization;
using Strive.API.Controllers;
using Xunit;

namespace Strive.Tests.API.Tasks
{
    public class TasksControllerCommonTests
    {
        [Fact]
        public void DecoratedWithAuthorizeAttribute()
        {
            Assert.NotNull(Attribute.GetCustomAttribute(
                typeof(TasksController),
                typeof(AuthorizeAttribute)));
        }
    }
}
