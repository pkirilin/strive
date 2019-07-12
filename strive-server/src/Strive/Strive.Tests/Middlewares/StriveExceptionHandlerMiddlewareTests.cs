using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Strive.API.Middlewares;
using Strive.Data.Dtos;
using Strive.Exceptions;
using Xunit;

namespace Strive.Tests.Middlewares
{
    public class StriveExceptionHandlerMiddlewareTests
    {
        [Fact]
        public async Task HandlesStriveExceptionCorrectly()
        {
            //----------------------------------------------
            // Arrange
            //----------------------------------------------

            var expectedException = new StriveException("test message", "test description");

            var middleware = new StriveExceptionHandlerMiddleware(innerContext =>
            {
                throw expectedException;
            });

            var context = new DefaultHttpContext();
            context.Response.Body = new MemoryStream();

            //----------------------------------------------
            // Act
            //----------------------------------------------

            await middleware.Invoke(context);

            context.Response.Body.Seek(0, SeekOrigin.Begin);

            var reader = new StreamReader(context.Response.Body);
            var result = JsonConvert.DeserializeObject(
                reader.ReadToEnd(), typeof(ErrorResponseDto))
                as ErrorResponseDto;

            //----------------------------------------------
            // Assert
            //----------------------------------------------

            Assert.NotNull(result);

            Assert.Equal(StatusCodes.Status500InternalServerError, context.Response.StatusCode);
            Assert.Equal("application/json", context.Response.ContentType);

            Assert.Equal(expectedException.Message, result.Message);
            Assert.Equal(expectedException.Description, result.Description);
        }

        [Fact]
        public async Task HandlesStriveSecurityExceptionCorrectly()
        {
            //----------------------------------------------
            // Arrange
            //----------------------------------------------

            var expectedException = new StriveSecurityException("test message", "test description");

            var middleware = new StriveExceptionHandlerMiddleware(innerContext =>
            {
                throw expectedException;
            });

            var context = new DefaultHttpContext();
            context.Response.Body = new MemoryStream();

            //----------------------------------------------
            // Act
            //----------------------------------------------

            await middleware.Invoke(context);

            context.Response.Body.Seek(0, SeekOrigin.Begin);

            var reader = new StreamReader(context.Response.Body);
            var result = JsonConvert.DeserializeObject(
                    reader.ReadToEnd(), typeof(ErrorResponseDto))
                as ErrorResponseDto;

            //----------------------------------------------
            // Assert
            //----------------------------------------------

            Assert.NotNull(result);

            Assert.Equal(StatusCodes.Status401Unauthorized, context.Response.StatusCode);
            Assert.Equal("application/json", context.Response.ContentType);

            Assert.Equal(expectedException.Message, result.Message);
            Assert.Equal(expectedException.Description, result.Description);
        }

        [Fact]
        public async Task HandlesCommonExceptionCorrectly()
        {
            //----------------------------------------------
            // Arrange
            //----------------------------------------------

            string exceptionMessage = "Internal server error";
            string exceptionDescription = "Unexpected error occured while processing the request";

            var expectedException = new Exception("test message");

            var middleware = new StriveExceptionHandlerMiddleware(innerContext =>
            {
                throw expectedException;
            });

            var context = new DefaultHttpContext();
            context.Response.Body = new MemoryStream();

            //----------------------------------------------
            // Act
            //----------------------------------------------

            await middleware.Invoke(context);

            context.Response.Body.Seek(0, SeekOrigin.Begin);

            var reader = new StreamReader(context.Response.Body);
            var result = JsonConvert.DeserializeObject(
                    reader.ReadToEnd(), typeof(ErrorResponseDto))
                as ErrorResponseDto;

            //----------------------------------------------
            // Assert
            //----------------------------------------------

            Assert.NotNull(result);

            Assert.Equal(StatusCodes.Status500InternalServerError, context.Response.StatusCode);
            Assert.Equal("application/json", context.Response.ContentType);

            Assert.Equal(exceptionMessage, result.Message);
            Assert.Equal(exceptionDescription, result.Description);
        }
    }
}
