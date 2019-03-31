using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Strive.Data;
using Strive.Data.Services;
using Strive.Helpers.Settings;

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
			// Configuring strongly typed settings objects
			var appSettingsSection = Configuration.GetSection("appSettings");
			var databaseConfigSection = Configuration.GetSection("databaseConfig");
			//var clientAppConfigSection = Configuration.GetSection("clientAppConfig");

			services.Configure<AppSettings>(appSettingsSection);
			services.Configure<DatabaseSettings>(databaseConfigSection);

			var appSettings = appSettingsSection.Get<AppSettings>();
			var databaseConfig = appSettingsSection.Get<DatabaseSettings>();

			services.AddCors(options => options.AddPolicy("AllowClientApp", builder =>
				builder.WithOrigins("http://localhost:10001")
					.AllowAnyHeader()
					.AllowAnyMethod()
					.AllowCredentials()));

			// Configure JWT authentication
			var key = Encoding.ASCII.GetBytes(appSettings.Secret);
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
						IssuerSigningKey = new SymmetricSecurityKey(key),
						ValidateIssuer = false,
						ValidateAudience = false
					};
				});

			services.AddAutoMapper();

			services.AddDbContext<StriveDbContext>();

			services.AddMvc()
				.SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

			services.AddScoped<IAccountService, AccountService>();
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