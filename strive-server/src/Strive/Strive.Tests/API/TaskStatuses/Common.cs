using System;
using Microsoft.AspNetCore.Authorization;
using Strive.API.Controllers;
using Xunit;

namespace Strive.Tests.API.TaskStatuses
{
    public class TaskStatusesControllerCommonTests
    {
        [Fact]
        public void DecoratedWithAuthorizeAttribute()
        {
            Assert.NotNull(Attribute.GetCustomAttribute(
                typeof(TaskStatusesController),
                typeof(AuthorizeAttribute)));
        }
    }
}
