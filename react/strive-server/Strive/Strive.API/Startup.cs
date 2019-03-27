using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Strive.Data;
using Strive.Data.Services;

namespace Strive.API
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			this.Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddCors(options => options.AddPolicy("AllowClientApp", builder =>
				builder.WithOrigins(this.Configuration.GetSection("clientAppConfig")["host"])
					.AllowAnyHeader()
					.AllowAnyMethod()
					.AllowCredentials()));

			// Configure JWT authentication
			services.AddAuthentication(options =>
				{
					options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
					options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
				})
				.AddJwtBearer(options =>
				{
					options.RequireHttpsMetadata = false;
					options.SaveToken = true;
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuerSigningKey = true,
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("secret")),
						ValidateIssuer = false,
						ValidateAudience = false
					};
				});

			services.AddAutoMapper();

			services.AddDbContext<StriveDbContext>(options =>
			{
				options.UseInMemoryDatabase("Strive");
			});

			services.AddMvc();

			services.AddScoped<IUserService, UserService>();
		}

		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseCors("AllowClientApp");

			app.UseAuthentication();

			app.UseMvc();
		}
	}
}