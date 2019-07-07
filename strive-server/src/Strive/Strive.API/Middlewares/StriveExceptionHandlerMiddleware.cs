using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Strive.Data.Dtos;
using Strive.Exceptions;

namespace Strive.API.Middlewares
{
    public class StriveExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _nextRequest;

        public StriveExceptionHandlerMiddleware(RequestDelegate nextRequest)
        {
            _nextRequest = nextRequest;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _nextRequest.Invoke(context);
            }
            catch (Exception e)
            {
                await HandleExceptionAsync(context, e);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            string exceptionMessage = "Internal server error";
            string exceptionDescription = "Unexpected error occured while processing the request";

            if (exception is StriveException customException)
            {
                exceptionMessage = customException.Message;
                exceptionDescription = customException.Description;
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            await context.Response.WriteAsync(JsonConvert.SerializeObject(
                new ErrorResponseDto()
                {
                    Message = exceptionMessage,
                    Description = exceptionDescription
                }));
        }
    }
}
