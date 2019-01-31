using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;

namespace Strive.Communication.Emails
{
	/// <summary>
	/// Предоставляет функционал, необходимый для отправки email сообщений
	/// </summary>
	public class EmailSender
	{
		private readonly EmailCreator _emailCreator;

		private readonly EmailConfig _emailConfig;

		public EmailSender(IEmailBuilder pemailBuilder)
		{
			_emailCreator = new EmailCreator(pemailBuilder);
			_emailConfig = pemailBuilder.EmailConfig;
		}

		/// <summary>
		/// Асинхронная отправка email сообщения
		/// </summary>
		public async Task SendEmailAsync(string preceiverEmail)
		{
			MimeMessage msg = _emailCreator.Create(preceiverEmail);

			using (var client = new SmtpClient())
			{
				// @todo придумать, как скрыть пароль
				await client.ConnectAsync(_emailConfig.Host, _emailConfig.Port, _emailConfig.UseSsl);
				await client.AuthenticateAsync(_emailConfig.UserName, _emailConfig.Password);
				await client.SendAsync(msg);
				await client.DisconnectAsync(true);
			}
		}
	}
}
